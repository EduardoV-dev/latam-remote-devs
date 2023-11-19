import { QueryClient, UseQueryOptions } from 'react-query';

import type { AxiosError } from 'axios';
import type { DefaultOptions, UseMutationOptions } from 'react-query';

const queryConfig: DefaultOptions<unknown> = {
    queries: {
        retry: false,
        refetchOnWindowFocus: false,
    },
    mutations: {
        retry: false,
    },
};

export const reactQueryClient = new QueryClient({
    defaultOptions: queryConfig,
});

type PromiseValue<
    PromiseType,
    Otherwise = PromiseType,
> = PromiseType extends Promise<infer Value>
    ? { 0: PromiseValue<Value>; 1: Value }[PromiseType extends Promise<unknown>
          ? 0
          : 1]
    : Otherwise;

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
    PromiseValue<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
    UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
    'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
    UseMutationOptions<
        ExtractFnReturnType<MutationFnType>,
        AxiosError,
        Parameters<MutationFnType>[0]
    >;
