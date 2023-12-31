import { MainLayout } from '@/layouts/main';
import { Route, Routes } from 'react-router-dom';
import { NewAccount } from './new-account';
import { ProfilePage } from './profile';
import { EditAccount } from './edit-account';
import { JobApplications } from './job-applications';
import { ChangePassword } from './change-password';

export const DevAccountRoutes = (): JSX.Element => {
    return (
        <MainLayout>
            <Routes>
                <Route path="" element={<ProfilePage />} />
                <Route path="new" element={<NewAccount />} />
                <Route path="information" element={<EditAccount />} />
                <Route path="jobs" element={<JobApplications />} />
                <Route path="change-password" element={<ChangePassword />} />
            </Routes>
        </MainLayout>
    );
};

DevAccountRoutes.displayName = 'DevAccountRoutes';
