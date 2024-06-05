import { AxiosError } from "axios";
import { ApiError } from "../../api";
import ErrorResolverChain from "../../api/ErrorResolverChain";

export const resolveError = (error: unknown, resolverChain?: ErrorResolverChain) => {
    const err = error as AxiosError<ApiError>;

    if(!resolverChain) {
        return 'Unresolved';
    }

    return resolverChain.resolveError(err.response?.data);
}

export const pack = <T>(obj: T, packEntity?: (obj: T) => any,) => {
    if(packEntity) {
        return packEntity(obj);
    }
    return obj;
}
export const unpack = <T>(obj: any, unpackEntity?: (obj: any) => T) => {
    if(unpackEntity) {
        return unpackEntity(obj);
    }
    return obj as T;
}
