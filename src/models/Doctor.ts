import UserInfo from "./UserInfo";
import { alias as infoAlias, fields as infoFields } from "./UserInfo";

export default interface Doctor extends UserInfo {
    name: string;
    birthDate: Date;
    phoneNumber: string;
};

export const alias = {
    ...infoAlias,
    'name': 'ФИО',
    'birthDate': 'Дата рождения',
    'phoneNumber': 'Номер телефона',
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
]