import { Link, NavLink } from 'react-router-dom';
import styles from './index.module.scss';
import { APP_ROUTES } from '@/config/routes';
import LogoImg from '@/assets/images/logo.png';
import clsx from 'clsx';

export const Navbar = (): JSX.Element => {
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
            </div>
        </nav>
    );
};
Navbar.displayName = 'Navbar';
