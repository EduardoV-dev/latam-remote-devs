import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';
import { devRoutes } from './dev-routes';

export const AppRoutes = (): JSX.Element => {
    const routing = useRoutes([...publicRoutes, ...devRoutes]);
    return <>{routing}</>;
};

AppRoutes.displayName = 'AppRoutes';
