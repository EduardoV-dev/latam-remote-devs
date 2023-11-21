import { axios } from '@/lib/axios';
import { Job } from '../types/job';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

const GET_BY_ID_ENDPOINT = (id: number) => `/job-offer/${id}`;

const getJobById = (id: number): Promise<Job> =>
    axios.get(GET_BY_ID_ENDPOINT(id));

type QueryFnType = typeof getJobById;

interface UseGetJobByIdOptions {
    jobId: number;
    config?: QueryConfig<QueryFnType>;
}

export const useGetJobById = ({ jobId, config }: UseGetJobByIdOptions) =>
    useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['job-by-id', jobId],
        queryFn: () => getJobById(jobId),
        ...config,
    });
