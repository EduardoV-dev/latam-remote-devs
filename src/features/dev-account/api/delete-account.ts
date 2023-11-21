import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from 'react-query';

const DELETE_ENDPOINT = '/auth/deleteAccount';

const deleteAccount = (): Promise<void> => axios.delete(DELETE_ENDPOINT);

export const useDeleteAccount = (
    config: MutationConfig<typeof deleteAccount> = {},
) =>
    useMutation({
        mutationKey: 'delete-account',
        mutationFn: deleteAccount,
        ...config,
    });
