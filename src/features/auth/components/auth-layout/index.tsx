import React from 'react';
import { MainLayout } from '@/layouts/main';
import LogoImg from '@/assets/images/logo.png';

import styles from './index.module.scss';

export const AuthLayout = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => (
    <MainLayout>
        <div className={styles.container}>
            <header className={styles.header}>
                <figure className={styles.logo}>
                    <img src={LogoImg} alt="LatamRemoteDevs" />
                    <figcaption>LatamRemoteDevs</figcaption>
                </figure>
            </header>

            <div className={styles.content}>{children}</div>
        </div>
    </MainLayout>
);

AuthLayout.displayName = 'AuthLayout';
