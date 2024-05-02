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

axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

        return config;
    }
)

axios.interceptors.response.use(
    (config) => config,
    async (error) => {
        const config = error.config;
        if(error.response.status === HttpStatusCode.Unauthorized) {
            const response = await authApi.get('/refresh');

            localStorage.setItem('accessToken', response.data.token.value);
            
            return axios(config);
        }
    }
)