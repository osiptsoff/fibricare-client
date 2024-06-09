import FeedbackInfo from "./FeedbackInfo";
import { alias as infoAlias, fields as infoFields } from "./FeedbackInfo";

export default interface PhysicalActivity extends FeedbackInfo {
    activity: string;
}

export const alias = {
    ...infoAlias,
    'activity': 'Описание активности',
};

export const field = [
    ...infoFields,
    {
        fieldName: 'activity',
        fieldType: 'string' as const,
    },
];