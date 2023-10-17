import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';
import './assets/styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    </React.StrictMode>,
);
