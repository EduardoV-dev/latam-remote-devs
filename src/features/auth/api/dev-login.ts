import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { UserDeveloperResponse } from '@/lib/auth';

const LOGIN_ENDPOINT = '/auth/login';

interface LoginParams {
    email: string;
    password: string;
}

const login = async ({
    email,
    password,
}: LoginParams): Promise<UserDeveloperResponse> =>
    await axios.post(LOGIN_ENDPOINT, { email, password });

export const useDevLogin = (config: MutationConfig<typeof login> = {}) =>
    useMutation({
        mutationKey: 'login',
        mutationFn: login,
        ...config,
    });
