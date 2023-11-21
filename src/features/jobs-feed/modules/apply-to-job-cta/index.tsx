import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useApplyToJob } from '../../api/apply-to-job';
import { toast } from 'react-toastify';
import { Auth } from '@/lib/auth';
import { APP_ROUTES } from '@/config/routes';
import CheckIcon from '../../assets/svg/check.svg?react';

export const ApplyToJobCTA = ({
    jobOfferId,
}: {
    jobOfferId: number;
}): JSX.Element => {
    const navigate = useNavigate();
    const { mutate, isLoading } = useApplyToJob({
        onSuccess: () => {
            toast.success('Aplicación enviada');
            Auth.updatePostulations(jobOfferId);
        },
        onError: (err) => {
            toast.error('Hubo un error al intentar postularse', err as any);
        },
    });

    const shouldPostulate = !isLoading && Auth.shouldPostulate(jobOfferId);

    const postulate = (): void => {
        const auth = Auth.getAuth();
        if (auth === null)
            return navigate(`${APP_ROUTES.PUBLIC.AUTH}/dev/login`);

        if (!shouldPostulate) return;

        mutate({
            developerId: auth?.user.developer?.id || 0,
            jobOfferId: jobOfferId,
        });
    };

    console.log(shouldPostulate);

    return (
        <Button type="primary" onClick={postulate} disabled={!shouldPostulate}>
            {shouldPostulate ? 'Aplicar' : <CheckIcon />}
        </Button>
    );
};
