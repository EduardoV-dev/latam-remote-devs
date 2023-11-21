import { axios } from '@/lib/axios';
import { Company } from '../types/company';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

const COMPANY_ENDPOINT = (id: number): string => `/company/${id}`;

const getCompanyById = (id: number): Promise<Company> =>
    axios.get(COMPANY_ENDPOINT(id));

type QueryFnType = typeof getCompanyById;

interface UseGetCompanyByIdOptions {
    companyId: number;
    config?: QueryConfig<QueryFnType>;
}

export const useGetCompanyById = ({
    companyId,
    config,
}: UseGetCompanyByIdOptions) =>
    useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['company-by-id', companyId],
        queryFn: () => getCompanyById(companyId),
        ...config,
    });
