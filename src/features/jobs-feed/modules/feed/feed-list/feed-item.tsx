import { useFeedStore } from '@/features/jobs-feed/stores/feed';
import { timeAgo } from '@/utils/timeago';

import styles from './index.module.scss';

import { Job } from '@/features/jobs-feed/types/job';
import { formatNumber } from '@/utils/number-format';

export const FeedItem = ({ job }: { job: Job }): JSX.Element => {
    const setJob = useFeedStore((state) => state.setJob);

    return (
        <div className={styles.item} onClick={() => setJob(job)}>
            <p className={styles.item__title}>{job.title}</p>
            <p className={styles.item__company}>{job.company.name}</p>

            <span className={styles.item__range}>
                U$ {formatNumber(job.minSalary)} - U${' '}
                {formatNumber(job.maxSalary)}
            </span>

            <p>{job.description}</p>

            <small className={styles.item__published}>
                {timeAgo(job.createdAt)}
            </small>
        </div>
    );
};
