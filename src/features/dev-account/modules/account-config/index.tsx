import { Button } from 'antd';
import styles from './index.module.scss';
import { Auth } from '@/lib/auth';
import { useAuthUserStore } from '@/features/auth/stores/auth-user';
import { APP_ROUTES } from '@/config/routes';
import { useNavigate } from 'react-router-dom';
import { DeleteAccountPopup } from './delete-account-popup';

export const AccountConfig = (): JSX.Element => {
    const navigate = useNavigate();
    const setIsLoggedIn = useAuthUserStore((state) => state.setIsLoggedIn);
    const setRole = useAuthUserStore((state) => state.setRole);

    const logUserOut = (): void => {
        Auth.logout();
        setIsLoggedIn(false);
        setRole(null);
        navigate(`${APP_ROUTES.PUBLIC.AUTH}/dev/login`);
    };

    return (
        <>
            <p className={styles.title}>Configuraciones de la cuenta</p>

            <section>
                <div className={styles.item}>
                    <div>
                        <p>Contraseña</p>
                        <span>******</span>
                    </div>

                    <Button
                        type="primary"
                        onClick={() =>
                            navigate(
                                APP_ROUTES.PRIVATE.DEV.ACCOUNT.CHANGE_PASSWORD,
                            )
                        }
                    >
                        Cambiar Contraseña
                    </Button>
                </div>

                <div className={styles.item}>
                    <p>{Auth.getAuth()?.user.email}</p>

                    <Button type="primary" onClick={logUserOut}>
                        Cerrar Sesión
                    </Button>
                </div>

                <div className={styles.item}>
                    <p>Eliminar Cuenta</p>

                    <DeleteAccountPopup />
                </div>
            </section>
        </>
    );
};
