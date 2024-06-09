export default interface Visit {
    id: number;
    patientId: number;
    doctorId: number;
    date: Date;
    patientComplaints: string;
    examinationResult: string;
    diagnosis: string;
    assignedTreatment: string;
}

export const alias = {
    'id': 'Идентификатор консультации',
    'patientId': 'Идентификатор пациента',
    'doctorId': 'Идентификатор врача',
    'date': 'Дата консультации',
    'patientComplaints': 'Жалобы пациента',
    'examinationResult': 'Результаты осмотра',
    'diagnosis': 'Диагноз',
    'assignedTreatment': 'Назначенное лечение',
};

export const fields = [
    // {
    //     fieldName: 'id',
    //     fieldType: 'number' as const,
    // },
    // {
    //     fieldName: 'patientId',
    //     fieldType: 'number' as const,
    // },
    // {
    //     fieldName: 'doctorId',
    //     fieldType: 'number' as const,
    // },
    {
        fieldName: 'date',
        fieldType: 'string' as const,
        validator: (val: string) => /^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}, [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/.test(val)
        || 'Пример корректной даты: 06.06.2024, 03:39:34',
    },
    {
        fieldName: 'patientComplaints',
        fieldType: 'string' as const,
    },
    {
        fieldName: 'examinationResult',
        fieldType: 'string' as const,
    },
    {
        fieldName: 'diagnosis',
        fieldType: 'string' as const,
    },
    {
        fieldName: 'assignedTreatment',
        fieldType: 'string' as const,
    },
];