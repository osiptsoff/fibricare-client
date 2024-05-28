import { personApi } from "../api";
import ErrorResolverChain from "../api/ErrorResolverChain";
import Patient from "../models/Patient";
import useCrud from "./useCrud";

let pageSize: number = import.meta.env.VITE_ENTITIES_IN_PAGE;
let endpoint: string = '/patient';

const patientCreateUpdateResolver = new ErrorResolverChain()
    .withResolver(e => e.status === 400 && !!e.message?.includes('doctor_id'),
        'Доктора с таким идентификатором не существует')
    .withResolver(e => e.status === 400 && !!e.message?.includes('login'),
        'Логин уже используется')
    .withResolver(e => e.status === 400 && !!e.message?.includes('snils'),
        'СНИЛС уже используется')
    .withResolver(e => e.status === 400 && !!e.message?.includes('omipolicy'),
        'Полис ОМС уже используется')
    .withResolver(e => e.status === 400 && !!e.message?.includes('medcard'),
        'Номер медицинской карты уже используется')
    .withResolver(e => e.status === 400, 'Запрос неправильно сформирован')
    .withDefaultMessage('Неизвестная ошибка');

const resolvers = {
    createResolver: patientCreateUpdateResolver,
    getPageResolver: new ErrorResolverChain()
        .withDefaultMessage('Неизвестная ошибка'),
    getOneResolver: new ErrorResolverChain()
        .withResolver(e => e.status === 400 && !!e.message, 'Сущности с таким id не существует')
        .withDefaultMessage('Неизвестная ошибка'),
    updateResolver: patientCreateUpdateResolver,
    removeResolver: new ErrorResolverChain()
        .withResolver(e => e.status === 400, 'Сущность уже удалена')
        .withDefaultMessage('Неизвестная ошибка'),
}

const unpack = (obj: any): Patient => {
    console.log(obj)
    return {
        name: obj.name,
        birthDate: obj.birthDate.split('T')[0],
        phoneNumber: obj.phoneNumber,
        doctorId: obj.doctorId,
        snils: obj.snils,
        medcard: obj.medcard,
        omiPolicy: obj.omiPolicy,
        sex: obj.sex,
        id: obj.userInfo.id,
        login: obj.userInfo.login,
    };
};

const pack = (obj: Patient) => {
    console.log(obj)
    return {
        name: obj.name,
        birthDate: obj.birthDate,
        phoneNumber: obj.phoneNumber,
        doctorId: obj.doctorId,
        snils: obj.snils,
        medcard: obj.medcard,
        omiPolicy: obj.omiPolicy,
        sex: obj.sex,
        userInfo: {
            id: obj.id,
            login: obj.login,
            password: obj.password,
        }
    };
};

const usePatient = () => {
    const crud = useCrud<Patient>({
        api: personApi,
        endpoint,
        resolvers,
        packEntity: pack,
        unpackEntity: unpack,
    });

    return {
        create: crud.create,
        getPage: (pageNumber: number) => crud.getPage(pageNumber, pageSize),
        getOne: crud.getOne,
        update: crud.update,
        remove: crud.remove,
    };
};

export default usePatient;