import styles from './index.module.scss';
import { FeedItem } from './feed-item';
import { useFeedInfiniteScroll } from './feed-infinite-scroll.hook';
import { Waypoint } from 'react-waypoint';
import React from 'react';

export const FeedList = (): JSX.Element => {
    const { jobs, isLoading, loadMoreJobs } = useFeedInfiniteScroll();

    return (
        <section className={styles.list}>
            {jobs?.map((job, index) => (
                <React.Fragment key={job.id + job.title}>
                    <FeedItem {...{ job }} />
                    {index === jobs.length - 1 ? (
                        <Waypoint onEnter={loadMoreJobs} />
                    ) : null}
                </React.Fragment>
            ))}

            {isLoading && <p>Cargando...</p>}
        </section>
    );
};

FeedList.displayName = 'FeedList';
