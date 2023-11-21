import { axios } from '@/lib/axios';
import { PaginatedPostulation } from '../types/postulation';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

const POSTULATED_JOBS = '/developer/postulation';

const getPostulatedJobs = (page: number): Promise<PaginatedPostulation> =>
    axios.get(POSTULATED_JOBS, { params: { page } });

type QueryFnType = typeof getPostulatedJobs;

interface UseGetPostulatedJobsOptions {
    page: number;
    config?: QueryConfig<QueryFnType>;
}

export const useGetPostulatedJobs = ({
    page,
    config,
}: UseGetPostulatedJobsOptions) =>
    useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['postulated-jobs', page],
        queryFn: () => getPostulatedJobs(page),
        ...config,
    });
