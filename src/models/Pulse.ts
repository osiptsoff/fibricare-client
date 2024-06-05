import FeedbackInfo from "./FeedbackInfo";
import { alias as infoAlias, fields as infoFields } from "./FeedbackInfo";

export default interface Pulse extends FeedbackInfo {
    rate: number;
    scale: string;
}

export const alias = {
    ...infoAlias,
    'rate': 'Значение',
    'scale': 'Оценка',
};

export const fields = [
    ...infoFields,
    {
        fieldName: 'rate',
        fieldType: 'number' as const,
    },
    {
        fieldName: 'scale',
        fieldType: 'string' as const,
    },
];