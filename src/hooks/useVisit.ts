import { doctorApi } from "../api";
import ErrorResolverChain from "../api/ErrorResolverChain";
import Visit from "../models/Visit";
import useCrud from "./generic/useCrud";
import usePageGetter from "./generic/usePageGetter";

const pageSize: number = import.meta.env.VITE_ENTITIES_IN_PAGE;
const endpoint: string = '/visit';

const visitCreateUpdateResolver = new ErrorResolverChain()
    .withResolver(e => e.status === 400 && !!e.message?.includes('not present'),
        'Врача или пациента с таким идентификатором не существует')
    .withResolver(e => e.status === 400, 'Запрос неправильно сформирован (ошибка клиентского приложения)')
    .withDefaultMessage('Ошибка сервера');

const resolvers = {
    createResolver: visitCreateUpdateResolver,
    getPageResolver: new ErrorResolverChain()
        .withDefaultMessage('Неизвестная ошибка'),
    getOneResolver: new ErrorResolverChain()
        .withResolver(e => e.status === 400 && !!e.message, 'Сущности с таким id не существует')
        .withDefaultMessage('Неизвестная ошибка'),
    updateResolver: visitCreateUpdateResolver,
    removeResolver: new ErrorResolverChain()
        .withResolver(e => e.status === 400, 'Сущность уже удалена')
        .withDefaultMessage('Неизвестная ошибка'),
}

const mapDate = (dat: string | Date) => {
    const date = new Date(dat);
    date.toString = () => date.toLocaleString('ru-RU');
    return date;
};

const mapDateToIso = (date: string | Date) => {
    return new Date(date);
};

const unpack = (obj: any): Visit => {
    obj.date = mapDate(obj.date);

    return obj as Visit;
};

const pack = (obj: Visit) => {
    return {
        id:  obj.id,
        patientId: obj.patientId,
        doctorId: obj.doctorId,
        date: mapDateToIso(obj.date),
        patientComplaints: obj.patientComplaints,
        examinationResult: obj.examinationResult,
        diagnosis: obj.diagnosis,
        assignedTreatment: obj.assignedTreatment,
    };
};

const useVisit = () => {
    const args = {
        api: doctorApi,
        endpoint,
        packEntity: pack,
        unpackEntity: unpack,
    };

    const crud = useCrud<Visit>({
        ...args,
        resolvers
    });
    const pageGetter = usePageGetter<Visit>({
        ...args,
        resolver: resolvers.getPageResolver,
    }, 'doctor');
    const getPageByIds = async (doctorId: number, patientId: number, pageNumber: number) => {
        const result = await pageGetter.getPage(doctorId, pageNumber, pageSize);

        if(typeof result === 'string') {
            return result;
        }

        result.data = result.data.filter(d => d.patientId === patientId);
        return result;
    };

    return {
        create: crud.create,
        getOne: crud.getOne,
        update: crud.update,
        remove: crud.remove,
        getPageByIds,
    };
};

export default useVisit;