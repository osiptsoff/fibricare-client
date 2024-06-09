import FeedbackInfo from "./FeedbackInfo";
import { alias as infoAlias, fields as infoFields } from "./FeedbackInfo";

export default interface BloodPressure extends FeedbackInfo {
    systolic: number;
    diastolic: number;
}

export const alias =  {
    ...infoAlias,
    'systolic': 'Систолическое давление',
    'diastolic': 'Диастолическое давление',
};

export const fields = [
    ...infoFields,
    {
        fieldName: 'systolic',
        fieldType: 'number' as const,
    },
    {
        fieldName: 'diastolic',
        fieldType: 'number' as const,
    },
];