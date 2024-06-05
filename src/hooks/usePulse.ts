import ErrorResolverChain from "../api/ErrorResolverChain";
import Pulse from "../models/Pulse";
import { doctorApi } from "../api";
import usePageGetter from "./generic/usePageGetter";

const pageSize: number = import.meta.env.VITE_MEASUREMENTS_IN_PAGE;
const endpoint: string = '/pulse';
const resolver =  new ErrorResolverChain()
        .withDefaultMessage('Сервер не отвечает');

const mapDate = (str: string) => {
    const date = new Date(str);
    date.toString = () => date.toLocaleString('ru-RU');
    return date;
};

const mapScale = (str: string) => {
    switch (str) {
        case 'low':
            return 'Низкий';
        case 'normal':
            return 'Нормальный';
        case 'increase':
            return 'Повышен';
        default:
            return str;
    }
};

const unpack = (obj: any): Pulse => {
    return {
        id: obj.feedback.id,
        patientId: obj.feedback.patientId,
        date: mapDate(obj.feedback.date),
        topicId: obj.feedback.topicId,
        rate: obj.rate,
        scale: mapScale(obj.scale),
    };
};

const usePulse = () => {
    const pageGetter = usePageGetter<Pulse>({
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

export default usePulse;
