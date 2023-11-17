import Axios, { AxiosHeaders } from 'axios';
import cookie from 'typescript-cookie';

import { BACKEND_BASE_URL } from '@/config/api';
import { TOKEN_KEY } from '@/config/sessions';

// import { Auth } from './auth';

export const axios = Axios.create({
    baseURL: BACKEND_BASE_URL,
});

axios.interceptors.request.use((config) => {
    const token: string | undefined = cookie.getCookie(TOKEN_KEY);

    if (token)
        (config.headers as AxiosHeaders).set(
            'Authorization',
            `Bearer ${token}`,
        );

    return config;
});

axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // const isUnauthorized = error.response?.status === 401;

        // if (isUnauthorized) Auth.logout();

        if (error.code === 'ERR_NETWORK')
            return Promise.reject(
                new Error('Hubo un error de red, por favor intente más tarde'),
            );

        return Promise.reject(
            new Error(error.response?.data?.message || error.message),
        );
    },
);
