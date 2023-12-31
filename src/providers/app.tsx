import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { reactQueryClient } from '@/lib/react-query';

const ErrorFallback = (): JSX.Element => (
    <main>
        <h1>Hubo un error en la página</h1>
    </main>
);

export const AppProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <QueryClientProvider client={reactQueryClient}>
            <ToastContainer
                autoClose={5000}
                closeOnClick
                pauseOnHover
                position="top-right"
            />
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#4b75c5',
                        colorLink: '#53399d',
                        colorBgLayout: '#fff',
                        colorText: '#333',
                    },
                }}
            >
                <Router>{children}</Router>
            </ConfigProvider>

            {!import.meta.env.PROD && <ReactQueryDevtools />}
        </QueryClientProvider>
    </ErrorBoundary>
);

AppProvider.displayName = 'AppProvider';
