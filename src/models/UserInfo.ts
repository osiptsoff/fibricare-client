
export default interface UserInfo {
    id: number;
    login: string;
    password?: string;
}

export const alias = {
    'id': 'Идентификатор',
    'login': 'Логин',
    'password': 'Пароль',
};

export const fields = [
    {
        fieldName: 'login',
        fieldType: 'string' as const,
    },
    {
        fieldName: 'password',
        fieldType: 'string' as const,
    },
];