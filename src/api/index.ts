import axios from "axios";

export const personApi = axios.create( {
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const AuthApi = axios.create( {
    baseURL: 'http://localhost:8081',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const DoctorApi = axios.create( {
    baseURL: 'http://localhost:8082',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

// TODO: 403 interceptor