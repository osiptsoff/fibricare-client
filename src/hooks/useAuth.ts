import { AxiosError, HttpStatusCode } from "axios";
import { ApiError, authApi } from "../api";

export interface Auth {
    login: string;
    password: string;
}

interface AuthResponse {
    token: {
        type?: string,
        value: string
    },
    userId: number,
    roles: Array<{name: string}>
}

export const authenticate = async (auth: Auth) => {
    try {
        const response = await authApi.post<AuthResponse>('/authenticate', auth);

        localStorage.setItem('accessToken', response.data.token.value);
        localStorage.setItem('id', response.data.userId.toString());
        localStorage.setItem('roles', JSON.stringify(response.data.roles.map(r => r.name)));

        return null;
    } catch (error) {
        const err = error as AxiosError<ApiError>;

        if(err.response?.data.status === HttpStatusCode.Forbidden) {
            return 'Некорректный логин или пароль';
        }
        return 'Произошла ошибка';
    }
}

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id');
    localStorage.removeItem('roles');

    location.reload();
}