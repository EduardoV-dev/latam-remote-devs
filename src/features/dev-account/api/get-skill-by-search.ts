import { axios } from '@/lib/axios';
import { Skill } from '../types/skill';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

const SKILL_SEARCH_ENDPOINT = (keyword: string) => `/skill/${keyword}`;

const getSkillBySearch = (search: string): Promise<Skill[] | null> =>
    new Promise((resolve, reject) => {
        try {
            if (search.trim() === '') return resolve(null);
            resolve(axios.get(SKILL_SEARCH_ENDPOINT(search)));
        } catch (error) {
            reject(error);
        }
    });

type QueryFnType = typeof getSkillBySearch;

type UseGetSkillsBySearchOptions = {
    search: string;
    config?: QueryConfig<QueryFnType>;
};

export const useGetSkillsBySearch = ({
    search,
    config,
}: UseGetSkillsBySearchOptions) =>
    useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['skills-search', search],
        queryFn: () => getSkillBySearch(search),
        ...config,
    });
