import { Link, NavLink } from 'react-router-dom';
import styles from './index.module.scss';
import { APP_ROUTES } from '@/config/routes';
import LogoImg from '@/assets/images/logo.png';
import clsx from 'clsx';
import { useAuthUserStore } from '@/features/auth/stores/auth-user';
import { UserMenu } from './user-menu';

export const Navbar = (): JSX.Element => {
    const isLoggedIn = useAuthUserStore((state) => state.isLoggedIn);
    const getLinkClasses = ({ isActive }: { isActive: boolean }): string =>
        clsx(styles.navbar__link, { [styles.active]: isActive });

    return (
        <nav className={styles.navbar}>
            <NavLink className={getLinkClasses} to={APP_ROUTES.PUBLIC.JOBS}>
                Buscar Trabajos
            </NavLink>

            <Link className={styles.navbar__logo} to={APP_ROUTES.PUBLIC.JOBS}>
                <img src={LogoImg} alt="LatamRemoteDevs" />
            </Link>

            {!isLoggedIn ? (
                <div className={styles.group}>
                    <NavLink
                        className={getLinkClasses}
                        to={`${APP_ROUTES.PUBLIC.AUTH}/dev/login`}
                    >
                        Ingresar
                    </NavLink>
                    <NavLink
                        className={getLinkClasses}
                        to={`${APP_ROUTES.PUBLIC.AUTH}/dev/registration`}
                    >
                        Registrarse
                    </NavLink>
                    <NavLink
                        className={getLinkClasses}
                        to="/company/auth/login"
                        style={{ marginLeft: 8 }}
                    >
                        Cuenta Empresarial
                    </NavLink>
                </div>
            ) : (
                <UserMenu />
            )}
        </nav>
    );
};
Navbar.displayName = 'Navbar';
