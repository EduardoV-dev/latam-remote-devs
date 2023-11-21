import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from 'react-query';

const APPLICATION_ENDPOINT = '/job-offer/postulation';

interface ApplyToJobParams {
    jobOfferId: number;
    developerId: number;
}

const applyToJob = ({
    developerId,
    jobOfferId,
}: ApplyToJobParams): Promise<{ jobOfferId: number }> =>
    axios.post(APPLICATION_ENDPOINT, { developerId, jobOfferId });

export const useApplyToJob = (config: MutationConfig<typeof applyToJob> = {}) =>
    useMutation({
        mutationKey: 'apply-to-job',
        mutationFn: applyToJob,
        ...config,
    });
