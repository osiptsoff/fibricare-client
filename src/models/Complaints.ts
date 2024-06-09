import FeedbackInfo from "./FeedbackInfo";
import { alias as infoAlias, fields as infoFields } from "./FeedbackInfo";

export default interface Complaints extends FeedbackInfo {
    complaints: string;
}

export const alias = {
    ...infoAlias,
    'complaints': 'Жалобы',
};

export const fields = [
    ...infoFields,
    {
        fieldName: 'complaints',
        fieldType: 'string' as const,
    },
];