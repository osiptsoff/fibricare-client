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