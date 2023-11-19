import React from 'react';
import UserIcon from '../assets/user.svg?react';
import styles from './index.module.scss';
import { Auth } from '@/lib/auth';
import { Link, useNavigate } from 'react-router-dom';
import ProfileIcon from '../assets/profile.svg?react';
import JobsIcon from '../assets/jobs.svg?react';
import { APP_ROUTES } from '@/config/routes';
import { useAuthUserStore } from '@/features/auth/stores/auth-user';

export const UserMenu = (): JSX.Element => {
    const navigate = useNavigate();
    const setIsLoggedIn = useAuthUserStore((state) => state.setIsLoggedIn);
    const setRole = useAuthUserStore((state) => state.setRole);
    const [open, setOpen] = React.useState<boolean>(false);

    const closeMenu = () => setOpen(false);

    React.useEffect(() => {
        if (open) window.addEventListener('click', closeMenu);
        else window.removeEventListener('click', closeMenu);
    }, [open]);

    const logUserOut = (): void => {
        Auth.logout();
        setIsLoggedIn(false);
        setRole(null);
        navigate(`${APP_ROUTES.PUBLIC.AUTH}/dev/login`);
    };

    return (
        <div className={styles['user-menu']}>
            <button
                onClick={(event) => {
                    event.stopPropagation();
                    setOpen((prev) => !prev);
                }}
            >
                <UserIcon />
            </button>

            {open && (
                <section className={styles['popup-menu']}>
                    <p>{Auth.getAuth()?.user.email}</p>

                    <nav>
                        <Link to={APP_ROUTES.PRIVATE.DEV.ACCOUNT.BASE}>
                            <ProfileIcon />
                            Perfil
                        </Link>

                        <Link to={APP_ROUTES.PRIVATE.DEV.JOBS}>
                            <JobsIcon />
                            Trabajos
                        </Link>
                    </nav>

                    <button type="button" onClick={logUserOut}>
                        Cerrar Sesión
                    </button>
                </section>
            )}
        </div>
    );
};

UserMenu.displayName = 'UserMenu';
