import React from 'react';
import { Outlet } from 'react-router-dom';

export const RouterWrapper = (): JSX.Element => (
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
);

RouterWrapper.displayName = 'RouterWrapper';
