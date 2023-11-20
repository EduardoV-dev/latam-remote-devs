import { JobsList } from '../../modules/jobs-list';
import styles from './index.module.scss';

export const JobApplications = (): JSX.Element => (
    <>
        <p className={styles.title}>Aplicaciones (3)</p>
        <JobsList />
    </>
);
