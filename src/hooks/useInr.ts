import { doctorApi } from "../api";
import ErrorResolverChain from "../api/ErrorResolverChain";
import Inr from "../models/Inr";
import { resolveError } from "./generic/auxiliaryMethods";
import usePageGetter from "./generic/usePageGetter";

const pageSize: number = import.meta.env.VITE_MEASUREMENTS_IN_PAGE;
const endpoint: string = '/inr';

const inrCreateUpdateResolver = new ErrorResolverChain()
    .withResolver(e => e.status === 400 && !!e.message?.includes('patient_id'),
        'Пациента с таким идентификатором не существует')
    .withResolver(e => e.status === 400, 'Запрос неправильно сформирован (ошибка клиентского приложения)')
    .withDefaultMessage('Ошибка сервера');

const resolvers = {
    createResolver: inrCreateUpdateResolver,
    getPageResolver: new ErrorResolverChain()
        .withDefaultMessage('Ошибка сервера'),
    getOneResolver: new ErrorResolverChain()
        .withResolver(e => e.status === 400 && !!e.message, 'Сущности с таким id не существует')
        .withDefaultMessage('Ошибка сервера'),
    updateResolver: inrCreateUpdateResolver,
    removeResolver: new ErrorResolverChain()
        .withResolver(e => e.status === 400, 'Сущность уже удалена')
        .withDefaultMessage('Ошибка сервера'),
}

const unpack = (obj: any): Inr => {
    const mapDate = (str: string) => {
        const date = new Date(str);
        date.toString = () => date.toLocaleString('ru-RU');
        return date;
    };

    return {
        patientId: obj.patientId,
        date: mapDate(obj.date),
        inrValue: obj.inrValue,
    };
};

const useInr = () => {
    const { getPage } = usePageGetter<Inr>({
        api: doctorApi,
        endpoint,
        unpackEntity: unpack,
        resolver: resolvers.getPageResolver
    }, 'patient');

    const create = async (obj: Inr) => {
        try {
            const response = await doctorApi.post<Inr>(endpoint, obj);

            return unpack(response.data);
        } catch (error) {
            return resolveError(error, resolvers?.createResolver);
        }
    };
    
    const remove = async (patientId: number, date: Date) => {
        const _date = new Date(date);
        _date.toString = () => _date.toISOString();

        try {
            await doctorApi.delete<void>(endpoint + '/' + patientId + '/' + _date);
        } catch (error) {
            return resolveError(error, resolvers?.removeResolver);
        }
    }

    return {
        create,
        getPageByPatientId: (patientId: number, pageNumber: number) =>
            getPage(patientId, pageNumber, pageSize),
        remove,
    };
};

export default useInr;