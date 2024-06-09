import FeedbackInfo from "./FeedbackInfo";
import { alias as infoAlias, fields as infoFields } from "./FeedbackInfo";

export default interface Weight extends FeedbackInfo {
    weight: number;
}

export const alias = {
    ...infoAlias,
    'weight': 'Вес',
};

export const fields = [
    ...infoFields,
    {
        fieldName: 'weight',
        fieldType: 'number' as const,
    },
];