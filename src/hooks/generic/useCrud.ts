import { AxiosInstance } from "axios";
import ErrorResolverChain from "../../api/ErrorResolverChain";
import Page from "../../models/Page";
import { pack, resolveError, unpack } from "./auxiliaryMethods";

type Args<T> = {
    api: AxiosInstance,
    endpoint: string,
    resolvers?: {
        createResolver?: ErrorResolverChain,
        getPageResolver?: ErrorResolverChain,
        getOneResolver?: ErrorResolverChain,
        updateResolver?: ErrorResolverChain,
        removeResolver?: ErrorResolverChain,
    },
    packEntity?: (obj: T) => any,
    unpackEntity?: (obj: any) => T,
};

const useCrud = <T>({api, endpoint, resolvers, packEntity, unpackEntity}: Args<T>) => {
    const _packEntity = (obj: T) => <T>pack(obj, packEntity);
    const _unpackEntity = (obj: T) => <T>unpack(obj, unpackEntity);

    const create = async (obj: T) => {
        try {
            const entity = _packEntity(obj);
    
            const response = await api.post<T>(endpoint, entity);

            return _unpackEntity(response.data);
        } catch (error) {
            return resolveError(error, resolvers?.createResolver);
        }
    };
    
    const getPage = async (pageNumber: number, pageSize: number) => {
        try {
            pageNumber--;
            const response = await api.get<Page<T>>(endpoint, {
                params: {
                    pageNumber,
                    pageSize,
                }
            });
    
            response.data.data = response.data.data.map( (e) => _unpackEntity(e));
            
            return response.data;
        } catch(error) {
            return resolveError(error, resolvers?.getPageResolver);
        }
    };
    
    const getOne = async (id: number) => {
        try {
            const response = await api.get<T>(endpoint + '/' + id);
    
            return _unpackEntity(response.data);
        } catch (error) {
            return resolveError(error, resolvers?.getOneResolver);
        }
    };
    
    const update = async (id: number, obj: T) => {
        try {
            const entity = _packEntity(obj);
    
            const response = await api.put<T>(endpoint + '/' + id, entity);
    
            return _unpackEntity(response.data);
        } catch (error) {
            return resolveError(error, resolvers?.updateResolver);
        }
    };
    
    const remove = async (id: number) => {
        try {
            await api.delete<void>(endpoint + '/' + id);
        } catch (error) {
            return resolveError(error, resolvers?.removeResolver);
        }
    }

    return {
        create,
        getPage,
        getOne,
        update,
        remove,
    };
};

export default useCrud;