import { AboutBrief } from '../../modules/about-brief';
import { AccountConfig } from '../../modules/account-config';
import styles from './index.module.scss';

export const ProfilePage = (): JSX.Element => (
    <div className={styles.container}>
        <AboutBrief />
        <AccountConfig />
    </div>
);
