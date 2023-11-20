import styles from './index.module.scss';
import { JobItem } from './job-item';

export const JobsList = (): JSX.Element => (
    <div className={styles.container}>
        <JobItem />
        <JobItem />
        <JobItem />
        <JobItem />
        <JobItem />
    </div>
);
