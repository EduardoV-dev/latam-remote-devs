import { JobsSearchInput } from '../../modules/jobs-search-input';
import { Feed } from '../../modules/feed';

export const JobsFeed = (): JSX.Element => (
    <>
        <JobsSearchInput />
        <Feed />
    </>
);

JobsFeed.displayName = 'JobsFeed';
