import axios, { HttpStatusCode } from "axios";

export interface ApiError {
    status: number;
    error: string;
    message?: string;
}

export const personApi = axios.create( {
    baseURL: import.meta.env.VITE_PERSON_API_BASE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authApi = axios.create( {
    baseURL: import.meta.env.VITE_AUTH_API_BASE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const doctorApi = axios.create( {
    baseURL: import.meta.env.VITE_DOCTOR_API_BASE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

const requestInterceptor = (config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
};

const errorHandler = async (error: any) => {
    const config = error.config;
    if(error.response.status === HttpStatusCode.Unauthorized && !config._retry) {
        config._retry = true;

        const response = await authApi.get('/refresh');

        localStorage.setItem('accessToken', response.data.token.value);
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        
        return axios(config);
    }
    return Promise.reject(error);
};

personApi.interceptors.request.use(requestInterceptor);
doctorApi.interceptors.request.use(requestInterceptor);

personApi.interceptors.response.use(
    (config) => config,
    errorHandler
)

doctorApi.interceptors.response.use(
    (config) => config,
    errorHandler
)