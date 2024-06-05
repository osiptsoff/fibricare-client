import UserInfo from "./UserInfo";
import { alias as infoAlias, fields as infoFields } from "./UserInfo";

export default interface Patient extends UserInfo {
    name: string;
    birthDate: Date;
    phoneNumber: string;
    doctorId: number;
    snils: number;
    medcard: number;
    omiPolicy: number;
    sex: string;
};

export const alias = {
    ...infoAlias,
    'name': 'ФИО',
    'birthDate': 'Дата рождения',
    'phoneNumber': 'Номер телефона',
    'doctorId': 'Идентификатор врача',
    'snils': 'СНИЛС',
    'medcard': 'Медицинская карта',
    'omiPolicy': 'Полис ОМС',
    'sex': 'Пол',
};

export const fields = [
    ...infoFields,
    {
        fieldName: 'name',
        fieldType: 'string' as const,
    },
    {
        fieldName: 'birthDate',
        fieldType: 'string' as const,
        validator: (val: string) => /^[0-9]{4,4}-[0-9]{1,2}-[0-9]{1,2}$/.test(val)
            || 'Пример корректной даты: 1999-01-27',
    },
    {
        fieldName: 'phoneNumber',
        fieldType: 'string' as const,
        validator: (val: string) => /^\+[0-9]{11,13}$/.test(val)
            || 'Пример корректного номера: +71111111111',
    },
    {
        fieldName: 'doctorId',
        fieldType: 'number' as const,
        validator: (val: string) => /^[0-9]+$/.test(val)
            || 'Введите корректное целое число',
    },
    {
        fieldName: 'snils',
        fieldType: 'number' as const,
        validator: (val: string) => /^[0-9]+$/.test(val)
            || 'Введите корректное целое число',
    },
    {
        fieldName: 'medcard',
        fieldType: 'number' as const,
        validator: (val: string) => /^[0-9]+$/.test(val)
            || 'Введите корректное целое число',
    },
    {
        fieldName: 'omiPolicy',
        fieldType: 'number' as const,
        validator: (val: string) => /^[0-9]+$/.test(val)
            || 'Введите корректное целое число',
    },
    {
        fieldName: 'string',
        fieldType: 'number' as const,
        validator: (val: string) => /^[МмЖжы]$/.test(val)
            || 'М - мужской, Ж - женский',
    },
];