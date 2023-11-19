import { useRoutes } from 'react-router-dom';
import { getPublicRoutes } from './public';
import { devRoutes } from './dev-routes';
import { useAuthUserStore } from '@/features/auth/stores/auth-user';

export const AppRoutes = (): JSX.Element => {
    const isLoggedIn = useAuthUserStore((state) => state.isLoggedIn);
    const role = useAuthUserStore((statet) => statet.role);

    const devRouting = isLoggedIn && role === 'Developer' ? devRoutes : [];
    const routing = useRoutes([...getPublicRoutes(isLoggedIn), ...devRouting]);
    return <>{routing}</>;
};

AppRoutes.displayName = 'AppRoutes';
