import React from 'react';
import { APP_ROUTES } from '@/config/routes';
import { RouterItem } from '@/types/general';
import { lazyImport } from '@/utils/lazy-import';
import { Navigate, Outlet } from 'react-router-dom';

const { JobsFeedRoutes } = lazyImport(
    () => import('@/features/jobs-feed'),
    'JobsFeedRoutes',
);
const { AuthRoutes } = lazyImport(
    () => import('@/features/auth'),
    'AuthRoutes',
);

export const publicRoutes: RouterItem[] = [
    {
        element: (
            <React.Suspense
                fallback={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        Cargando página
                    </div>
                }
            >
                <Outlet />
            </React.Suspense>
        ),
        path: '/',
        children: [
            { path: '/', element: <Navigate to={APP_ROUTES.PUBLIC.JOBS} /> },
            {
                path: `${APP_ROUTES.PUBLIC.JOBS}/*`,
                element: <JobsFeedRoutes />,
            },
            {
                path: `${APP_ROUTES.PUBLIC.AUTH}/*`,
                element: <AuthRoutes />,
            },
        ],
    },
];
