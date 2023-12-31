import { Route, Routes } from 'react-router-dom';
import { JobsFeed } from './jobs-feed';
import { Job } from './job';
import { MainLayout } from '@/layouts/main';
import { CompanyDetails } from './company-details';

export const JobsFeedRoutes = (): JSX.Element => (
    <MainLayout>
        <Routes>
            <Route path="" element={<JobsFeed />} />
            <Route path=":jobId" element={<Job />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
        </Routes>
    </MainLayout>
);

JobsFeedRoutes.displayName = 'JobsFeedRoutes';
