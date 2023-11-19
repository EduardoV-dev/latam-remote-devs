import { axios } from '@/lib/axios';
import { DeveloperAccountDAO } from '..';
import { Auth } from '@/lib/auth';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

const ACCOUNT_ENDPOINT = (developerId: number) => `/developer/${developerId}`;

const getDeveloperAccountData = (): Promise<DeveloperAccountDAO> =>
    axios.get(ACCOUNT_ENDPOINT(Auth.getAuth()!.user.developer!.id));

type QueryFnType = typeof getDeveloperAccountData;

export const useGetAccount = (config: QueryConfig<QueryFnType> = {}) =>
    useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: 'developer-account',
        queryFn: () => getDeveloperAccountData(),
        ...config,
    });
