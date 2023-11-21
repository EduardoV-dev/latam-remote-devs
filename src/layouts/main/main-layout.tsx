import { Layout } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';

import styles from './main-layout.module.scss';
import clsx from 'clsx';
import { Navbar } from './navbar';
import LogoImg from '@/assets/images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUserStore } from '@/features/auth/stores/auth-user';
import { APP_ROUTES } from '@/config/routes';

const { Header, Content, Footer } = Layout;

interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props): JSX.Element => {
    const isLoggedIn = useAuthUserStore((state) => state.isLoggedIn);
    const isFirstLogin = useAuthUserStore((state) => state.isFirstLogin);
    const navigate = useNavigate();
    const location = useLocation();
    const firstRender = React.useRef<boolean>(true);

    React.useEffect(() => {
        if (
            isLoggedIn &&
            isFirstLogin &&
            location.pathname !== APP_ROUTES.PRIVATE.DEV.ACCOUNT.NEW &&
            firstRender.current
        ) {
            navigate(APP_ROUTES.PRIVATE.DEV.ACCOUNT.NEW);
            toast.info('Para continuar, debe completar su perfil');
            firstRender.current = false;
        }
    }, [isLoggedIn, isFirstLogin, navigate, location.pathname]);

    return (
        <Layout className={clsx('layout', styles.container)}>
            <div>
                <Header className={styles.header}>
                    <Navbar />
                </Header>

                <Content style={{ padding: '0 50px' }}>
                    <div
                        className={clsx('site-layout-content', styles.content)}
                    >
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
};
MainLayout.displayName = 'MainLayout';
