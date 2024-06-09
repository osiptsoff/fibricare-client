import ErrorResolverChain from "../api/ErrorResolverChain";
import Treatments from "../models/Treatments";
import { doctorApi } from "../api";
import usePageGetter from "./generic/usePageGetter";

const pageSize: number = import.meta.env.VITE_MEASUREMENTS_IN_PAGE;
const endpoint: string = '/treatments';
const resolver =  new ErrorResolverChain()
        .withDefaultMessage('Сервер не отвечает');

const mapDate = (str: string) => {
    const date = new Date(str);
    date.toString = () => date.toLocaleString('ru-RU');
    return date;
};

const unpack = (obj: any): Treatments => {
    return {
        id: obj.feedback.id,
        patientId: obj.feedback.patientId,
        date: mapDate(obj.feedback.date),
        topicId: obj.feedback.topicId,
        treatments: obj.treatments,
    };
};

const useTreatments = () => {
    const pageGetter = usePageGetter<Treatments>({
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

export default useTreatments;
