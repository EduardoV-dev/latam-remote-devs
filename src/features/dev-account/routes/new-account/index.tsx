import { toast } from 'react-toastify';
import { useAuthUserStore } from '@/features/auth/stores/auth-user';
import { AccountForm } from '../../modules/account-form';
import { Auth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes';
import React from 'react';

export const NewAccount = (): JSX.Element => {
    const navigate = useNavigate();
    const isFirstLogin = useAuthUserStore((state) => state.isFirstLogin);
    const setIsFirstLogin = useAuthUserStore((state) => state.setIsFirstLogin);

    const handleSubmit = (): void => {
        navigate(APP_ROUTES.PUBLIC.JOBS);
        toast.success('Perfil Completo');

        Auth.saveFirstLogin(false);
        setIsFirstLogin(false);
    };

    React.useEffect(() => {
        !isFirstLogin && navigate(APP_ROUTES.PRIVATE.DEV.ACCOUNT.BASE);
    }, [navigate, isFirstLogin]);

    return <AccountForm onSuccess={handleSubmit} />;
};

NewAccount.displayName = 'NewAccount';
