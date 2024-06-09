import FeedbackInfo from "./FeedbackInfo";
import { alias as infoAlias, fields as infoFields } from "./FeedbackInfo";

export default interface Treatments extends FeedbackInfo {
    treatments: string;
}

export const alias = {
    ...infoAlias,
    'treatments': 'Принимаемые препараты'
};

export const fields = [
    ...infoFields,
    {
        fieldName: 'treatments',
        fieldType: 'string' as const,
    },
];