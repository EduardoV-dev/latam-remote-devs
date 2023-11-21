import LogoImg from '@/assets/images/logo.png';
import styles from './index.module.scss';

export const ChangePasswordLayout = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => (
    <div className={styles.container}>
        <header className={styles.header}>
            <figure className={styles.logo}>
                <img src={LogoImg} alt="LatamRemoteDevs" />
                <figcaption>LatamRemoteDevs</figcaption>
            </figure>
        </header>

        <div className={styles.content}>{children}</div>
    </div>
);
