import { axios } from '@/lib/axios';
import { PaginatedJobs } from '../types/job';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

const JOBS_ENDPOINT = '/job-offer';

interface GetJobsParams {
    page: number;
    search?: string;
    skills?: number[];
}

const getJobs = ({
    page,
    search,
    skills,
}: GetJobsParams): Promise<PaginatedJobs> => {
    const params: URLSearchParams = new URLSearchParams();

    params.append('page', page.toString());

    if (search) params.append('search', search);
    if (skills)
        skills.forEach((skill) => params.append('skillsIds', skill.toString()));

    return axios.get(JOBS_ENDPOINT, {
        params,
    });
};

type QueryFnType = typeof getJobs;

interface UseGetJobsOptions {
    options: GetJobsParams;
    config?: QueryConfig<QueryFnType>;
}

export const useGetJobs = ({ options, config }: UseGetJobsOptions) =>
    useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['get-jobs', options],
        queryFn: () => getJobs(options),
        ...config,
    });
