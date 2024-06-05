export default interface FeedbackInfo {
    id: number;
    patientId: number;
    date: Date;
    topicId: number;
}

export const alias = {
    'id': 'Идентификатор',
    'patientId': 'Идентификатор пациента',
    'date': 'Время отправки',
    'topicId': 'Идентификатор предписания'
};

export const fields = [
    {
        fieldName: 'id',
        fieldType: 'number' as const,
    },
    {
        fieldName: 'patientId',
        fieldType: 'number' as const,
    },
    {
        fieldName: 'date',
        fieldType: 'string' as const,
    },
    {
        fieldName: 'topicId',
        fieldType: 'number' as const,
    },
];