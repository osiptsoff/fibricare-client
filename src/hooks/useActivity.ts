import { doctorApi } from "../api";
import ErrorResolverChain from "../api/ErrorResolverChain";
import PhysicalActivity from "../models/PhysicalActivity";
import usePageGetter from "./generic/usePageGetter";

const pageSize: number = import.meta.env.VITE_MEASUREMENTS_IN_PAGE;
const endpoint: string = '/activity';
const resolver =  new ErrorResolverChain()
        .withDefaultMessage('Сервер не отвечает');

const mapDate = (str: string) => {
    const date = new Date(str);
    date.toString = () => date.toLocaleString('ru-RU');
    return date;
};

const unpack = (obj: any): PhysicalActivity => {
    return {
        id: obj.feedback.id,
        patientId: obj.feedback.patientId,
        date: mapDate(obj.feedback.date),
        topicId: obj.feedback.topicId,
        activity: obj.activityDescription,
    };
};

const useActivity = () => {
    const pageGetter = usePageGetter<PhysicalActivity>({
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

export default useActivity;
