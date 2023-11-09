import { Layout } from 'antd';
import React from 'react';

import styles from './main-layout.module.scss';
import clsx from 'clsx';
import { Navbar } from './navbar';
import LogoImg from '@/assets/images/logo.png';

const { Header, Content, Footer } = Layout;

interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props): JSX.Element => (
    <Layout className={clsx('layout', styles.container)}>
        <div>
            <Header className={styles.header}>
                <Navbar />
            </Header>

            <Content style={{ padding: '0 50px' }}>
                <div className={clsx('site-layout-content', styles.content)}>
                    {children}
                </div>
            </Content>
        </div>

        <Footer className={styles.footer}>
            <img src={LogoImg} alt="LatamRemoteDevs" />
            <p>LatamRemoteDevs - © Todos los Derechos Reservados 2023 </p>
        </Footer>
    </Layout>
);

MainLayout.displayName = 'MainLayout';
