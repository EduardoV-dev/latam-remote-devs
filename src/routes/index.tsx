import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';

export const AppRoutes = (): JSX.Element => {
    const routing = useRoutes(publicRoutes);
    return <>{routing}</>;
};

AppRoutes.displayName = 'AppRoutes';
