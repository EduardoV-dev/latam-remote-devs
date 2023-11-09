import { Route, Routes } from 'react-router-dom';
import { JobsFeed } from './jobs-feed';
import { Job } from './job';

export const JobsFeedRoutes = (): JSX.Element => (
    <Routes>
        <Route path="" element={<JobsFeed />} />
        <Route path=":jobId" element={<Job />} />
    </Routes>
);

JobsFeedRoutes.displayName = 'JobsFeedRoutes';
