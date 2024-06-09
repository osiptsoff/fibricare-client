import { doctorApi } from "../api";
import ErrorResolverChain from "../api/ErrorResolverChain";
import Chads from "../models/Chads";
import { resolveError } from "./generic/auxiliaryMethods";
import useCrud from "./generic/useCrud";

type ScaleAnswer = {scaleValue: number};

const convertArgs = (sexParam: number | string, birthDateParam: Date) => {
    let sex = 1
    let birthDate = birthDateParam;

    if(typeof sexParam === 'string' && sexParam === 'Ж') {
        sex = 2;
    }

    return {
        sex,
        birthDate,
    };
};

const endpoint = '/chads';
const nonExistentMessage = 'Пациент не имеет шкалы, создайте ее';
const resolver = new ErrorResolverChain()
    .withResolver(e => e.status === 400 && !!e.message, nonExistentMessage)
    .withResolver(e => e.status === 400, 'Ошибка в формировании запроса (клиентское приложение)')
    .withDefaultMessage('Сервер не отвечает');

const useChads = () => {
    const args = {
        api: doctorApi,
        resolvers: { getOneResolver: resolver },
        endpoint,
    };

    const { create, update, remove, getOne } = useCrud<Chads>(args);
    const calculate = async (patientId?: number, sex?: number | string, birthDate?: Date) => {
        if(!patientId || !sex || !birthDate) {
            throw new Error('Sex and birthdate must be defined');
        }

        try {
            const result = await doctorApi.get<ScaleAnswer>(endpoint + '/' + patientId + '/calculate', {
                params: convertArgs(sex, birthDate)
            })

            return result.data.scaleValue;
        } catch (error) {
            return resolveError(error, resolver);
        }
    }
    const generateDummy = (): Chads => {
        return {
            patientId: -1,
            hasHeartFailureOrDisfunction: false,
            hasArterialHypertension: false,
            hasDiabetes: false,
            hadStroke: false,
            hasVascularDesease: false,
        };
    };

    return {
        create,
        update,
        remove,
        get: getOne,
        calculate,
        generateDummy,
        nonExistentMessage,
    }
};

export default useChads;