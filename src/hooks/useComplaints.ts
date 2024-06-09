import { doctorApi } from "../api";
import ErrorResolverChain from "../api/ErrorResolverChain";
import Complaints from "../models/Complaints";
import usePageGetter from "./generic/usePageGetter";

const pageSize: number = import.meta.env.VITE_MEASUREMENTS_IN_PAGE;
const endpoint: string = '/complaints';
const resolver =  new ErrorResolverChain()
        .withDefaultMessage('Сервер не отвечает');

const mapDate = (str: string) => {
    const date = new Date(str);
    date.toString = () => date.toLocaleString('ru-RU');
    return date;
};

const unpack = (obj: any): Complaints => {
    return {
        id: obj.feedback.id,
        patientId: obj.feedback.patientId,
        date: mapDate(obj.feedback.date),
        topicId: obj.feedback.topicId,
        complaints: obj.complaints,
    };
};

const useComplaints = () => {
    const pageGetter = usePageGetter<Complaints>({
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

export default useComplaints;
