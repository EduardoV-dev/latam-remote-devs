import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { UserDeveloperResponse } from '@/lib/auth';
import { DevRegister } from '../routes/dev-register';

const REGISTER_ENDPOINT = '/auth/register';

const register = async (params: DevRegister): Promise<UserDeveloperResponse> =>
    await axios.post(REGISTER_ENDPOINT, { ...params, role: 'Developer' });

export const useDevRegister = (config: MutationConfig<typeof register> = {}) =>
    useMutation({
        mutationKey: 'register',
        mutationFn: register,
        ...config,
    });
