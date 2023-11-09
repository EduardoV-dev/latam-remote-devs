import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './public';

export const AppRoutes = (): JSX.Element => {
    const routing = useRoutes(publicRoutes);
    console.log(routing?.props);

    return <>{routing}</>;
};

AppRoutes.displayName = 'AppRoutes';
