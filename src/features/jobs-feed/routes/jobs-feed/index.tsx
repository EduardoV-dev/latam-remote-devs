import { JobsSearchInput } from '../../modules/jobs-search-input';
import { Feed } from '../../modules/feed';
import React from 'react';
import { useFeedStore } from '../../stores/feed';

export const JobsFeed = (): JSX.Element => {
    const setJob = useFeedStore((state) => state.setJob);

    React.useEffect(() => {
        return () => setJob(null);
    }, [setJob]);

    return (
        <>
            <JobsSearchInput />
            <Feed />
        </>
    );
};
JobsFeed.displayName = 'JobsFeed';
