import { APP_ROUTES } from '@/config/routes';
import { RouterItem } from '@/types/general';
import { PublicRouteWrapping } from './wrappers/public';
import { lazyImport } from '@/utils/lazy-import';
import { Navigate } from 'react-router-dom';

const { JobsFeedRoutes } = lazyImport(
    () => import('@/features/jobs-feed'),
    'JobsFeedRoutes',
);

export const publicRoutes: RouterItem[] = [
    {
        element: <PublicRouteWrapping />,
        path: '/',
        children: [
            { path: '/', element: <Navigate to={APP_ROUTES.PUBLIC.JOBS} /> },
            {
                path: `${APP_ROUTES.PUBLIC.JOBS}/*`,
                element: <JobsFeedRoutes />,
            },
        ],
    },
];
