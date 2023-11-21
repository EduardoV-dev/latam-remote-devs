import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from 'react-query';

const CHANGE_PASSWORD_ENDPOINT = '/auth/change-password';

interface ChangePasswordParams {
    oldPassword: string;
    newPassword: string;
}

const changePassword = (params: ChangePasswordParams) =>
    axios.post(CHANGE_PASSWORD_ENDPOINT, params);

export const useChangePassword = (
    config: MutationConfig<typeof changePassword> = {},
) =>
    useMutation({
        mutationFn: changePassword,
        mutationKey: 'change-password',
        ...config,
    });
