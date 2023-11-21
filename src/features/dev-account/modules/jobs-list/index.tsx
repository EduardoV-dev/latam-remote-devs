import React from 'react';
import styles from './index.module.scss';
import { JobItem } from './job-item';
import { usePostulationInfiniteScroll } from './postulations-infinite-scroll.hook';
import { Waypoint } from 'react-waypoint';

export const JobsList = (): JSX.Element => {
    const { isLoading, loadMoreJobs, postulations, results } =
        usePostulationInfiniteScroll();

    return (
        <>
            <p className={styles.title}>Aplicaciones ({results || '...'})</p>

            <div className={styles.container}>
                {postulations?.map((postulation, index) => (
                    <React.Fragment key={postulation.id}>
                        <JobItem {...{ postulation }} />

                        {index === postulations.length - 1 && (
                            <Waypoint onEnter={loadMoreJobs} />
                        )}
                    </React.Fragment>
                ))}

                {isLoading && <p>Cargando...</p>}
            </div>
        </>
    );
};
