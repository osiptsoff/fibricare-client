import { doctorApi } from "../api";
import ErrorResolverChain from "../api/ErrorResolverChain";
import HasBled from "../models/HasBled";
import { resolveError } from "./generic/auxiliaryMethods";
import useCrud from "./generic/useCrud";

type ScaleAnswer = {scaleValue: number};

const endpoint = '/hasbled';
const nonExistentMessage = 'Пациент не имеет шкалы, создайте ее';
const resolver = new ErrorResolverChain()
    .withResolver(e => e.status === 400 && !!e.message, nonExistentMessage)
    .withResolver(e => e.status === 400, 'Ошибка в формировании запроса (клиентское приложение)')
    .withDefaultMessage('Сервер не отвечает');

const useHasBled = () => {
    const args = {
        api: doctorApi,
        resolvers: { getOneResolver: resolver },
        endpoint,
    };

    const { create, update, remove, getOne } = useCrud<HasBled>(args);
    const calculate = async (patientId?: number, birthDate?: Date) => {
        if(!patientId || !birthDate) {
            throw new Error('Sex and birthdate must be defined');
        }

        try {
            const result = await doctorApi.get<ScaleAnswer>(endpoint + '/' + patientId + '/calculate', {
                params: { birthDate }
            })

            return result.data.scaleValue;
        } catch (error) {
            return resolveError(error, resolver);
        }
    }
    const generateDummy = (): HasBled => {
        return {
            patientId: -1,
            hasHypertension: false,
            hasKidneyDisfunction: false,
            hasLiverDisfunction: false,
            hadStroke: false,
            hasBled: false,
            hasLabileInr: false,
            takingAlcohol: false,
            takingMedicines: false,
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

export default useHasBled;