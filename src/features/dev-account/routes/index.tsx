import { MainLayout } from '@/layouts/main';
import { Route, Routes } from 'react-router-dom';
import { NewAccount } from './new-account';

export const DevAccountRoutes = (): JSX.Element => (
    <MainLayout>
        <Routes>
            <Route path="new" element={<NewAccount />} />
        </Routes>
    </MainLayout>
);

DevAccountRoutes.displayName = 'DevAccountRoutes';
