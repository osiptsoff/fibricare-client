import { doctorApi } from "../api";
import ErrorResolverChain from "../api/ErrorResolverChain";
import Weight from "../models/Weight";
import usePageGetter from "./generic/usePageGetter";

const pageSize: number = import.meta.env.VITE_MEASUREMENTS_IN_PAGE;
const endpoint: string = '/weight';
const resolver =  new ErrorResolverChain()
        .withDefaultMessage('Сервер не отвечает');

const mapDate = (str: string) => {
    const date = new Date(str);
    date.toString = () => date.toLocaleString('ru-RU');
    return date;
};

const unpack = (obj: any): Weight => {
    return {
        id: obj.feedback.id,
        patientId: obj.feedback.patientId,
        date: mapDate(obj.feedback.date),
        topicId: obj.feedback.topicId,
        weight: obj.weight,
    };
};

const useWeight = () => {
    const pageGetter = usePageGetter<Weight>({
        api: doctorApi,
        endpoint,
        unpackEntity: unpack,
        resolver
    }, 'patient');

    return {
        getPageByPatientId: (patientId: number, pageNumber: number) => 
            pageGetter.getPage(patientId, pageNumber, pageSize),
    };
};

export default useWeight;
