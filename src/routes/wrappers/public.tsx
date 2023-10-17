import React from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from '@/layouts/main';

export const PublicRouteWrapping = (): JSX.Element => (
    <MainLayout>
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
    </MainLayout>
);

PublicRouteWrapping.displayName = 'PublicRouteWrapping';
