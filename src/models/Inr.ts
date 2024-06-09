export default interface Inr {
    patientId: number;
    date: Date;
    inrValue: number;
}

export const alias = {
    'patientId': 'Идентификатор пациента',
    'date': 'Дата и время отправки',
    'inrValue': 'Значение МНО',
};

export const fields = [
    // {
    //     fieldName: 'patientId',
    //     fieldType: 'number' as const,
    // },
    // {
    //     fieldName: 'date',
    //     fieldType: 'string' as const,
    //     validator: (val: string) => /^[0-9]{4,4}-[0-9]{1,2}-[0-9]{1,2}$/.test(val)
    //         || 'Пример корректной даты: 1999-01-27',
    // },
    {
        fieldName: 'inrValue',
        fieldType: 'number' as const,

    },
];