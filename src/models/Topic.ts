export default interface Topic {
    id: number;
    patientId: number;
    doctorId: number;
    startTime: Date;
    remindPeriodHours: number;
    text: string;
}

export const alias = {
    'id': 'Идентификатор назначения',
    'patientId': 'Идентификатор пациента',
    'doctorId': 'Идентификатор врача',
    'startTime': 'Время первого уведомления',
    'remindPeriodHours': 'Период уведомлений',
    'text': 'Текст уведомления',
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
        fieldName: 'startTime',
        fieldType: 'string' as const,
        validator: (val: string) => /^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}, [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/.test(val)
        || 'Пример корректной даты: 06.06.2024, 03:39:34',
    },
    {
        fieldName: 'remindPeriodHours',
        fieldType: 'number' as const,
    },
    {
        fieldName: 'text',
        fieldType: 'string' as const,
    },
];