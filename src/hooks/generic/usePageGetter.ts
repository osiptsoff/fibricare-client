import { AxiosInstance } from "axios";
import Page from "../../models/Page";
import { resolveError, unpack } from "./auxiliaryMethods";
import ErrorResolverChain from "../../api/ErrorResolverChain";

type Args<T> = {
    api: AxiosInstance,
    endpoint: string,
    resolver?: ErrorResolverChain,
    packEntity?: (obj: T) => any,
    unpackEntity?: (obj: any) => T,
};

const usePageGetter = <T>(args: Args<T>, ownerName: string) => {
    const _unpackEntity = (obj: T) => <T>unpack(obj, args.unpackEntity);
    const endpoint = args.endpoint + '/' + ownerName + '/';

    const getPage = async (ownerId: number, pageNumber: number, pageSize: number) => {
        pageNumber--;
        try {
            const response = await args.api.get<Page<T>>(endpoint + ownerId, {
                params: {
                    pageNumber,
                    pageSize,
                }
            });
    
            response.data.data = response.data.data.map( (e) => _unpackEntity(e));
            
            return response.data;
        } catch(error) {
            return resolveError(error, args.resolver);
        }
    }

    return { getPage };
}

export default usePageGetter;