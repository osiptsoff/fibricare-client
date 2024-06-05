import { personApi } from "../api";
import ErrorResolverChain from "../api/ErrorResolverChain";
import Doctor from "../models/Doctor";
import useCrud from "./generic/useCrud";

const pageSize: number = import.meta.env.VITE_ENTITIES_IN_PAGE;
const endpoint: string = '/doctor';

const doctorCreateUpdateResolver = new ErrorResolverChain()
    .withResolver(e => e.status === 400 && !!e.message?.includes('login'),
        'Логин уже используется')
    .withResolver(e => e.status === 400, 'Запрос неправильно сформирован')
    .withDefaultMessage('Неизвестная ошибка');

const resolvers = {
    createResolver: doctorCreateUpdateResolver,
    getPageResolver: new ErrorResolverChain()
        .withDefaultMessage('Неизвестная ошибка'),
    getOneResolver: new ErrorResolverChain()
        .withResolver(e => e.status === 400 && !!e.message, 'Сущности с таким id не существует')
        .withDefaultMessage('Неизвестная ошибка'),
    updateResolver: doctorCreateUpdateResolver,
    removeResolver: new ErrorResolverChain()
        .withResolver(e => e.status === 400, 'Сущность уже удалена')
        .withDefaultMessage('Неизвестная ошибка'),
}

const unpack = (obj: any): Doctor => {
    return {
        name: obj.name,
        birthDate: obj.birthDate.split('T')[0],
        phoneNumber: obj.phoneNumber,
        id: obj.userInfo.id,
        login: obj.userInfo.login,
    };
};

const pack = (obj: Doctor) => {
    return {
        name: obj.name,
        birthDate: obj.birthDate,
        phoneNumber: obj.phoneNumber,
        userInfo: {
            id: obj.id,
            login: obj.login,
            password: obj.password,
        }
    };
};

const useDoctor = () => {
    const crud = useCrud<Doctor>({
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

export default useDoctor;