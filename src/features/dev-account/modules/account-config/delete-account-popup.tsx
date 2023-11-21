import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';
import CloseIcon from '@/assets/svg/close.svg?react';
import clsx from 'clsx';
import { Auth } from '@/lib/auth';
import { useDeleteAccount } from '../../api/delete-account';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes';
import { useAuthUserStore } from '@/features/auth/stores/auth-user';

export const DeleteAccountPopup = (): JSX.Element => {
    const navigate = useNavigate();
    const setIsLoggedIn = useAuthUserStore((state) => state.setIsLoggedIn);

    const { mutate, isLoading } = useDeleteAccount({
        onSuccess: () => {
            toast.success('Tu cuenta ha sido eliminada');
            Auth.logout();
            navigate(APP_ROUTES.PUBLIC.JOBS);
            setIsLoggedIn(false);
            setOpen(false);
        },
        onError: (err) => {
            console.error(err as any);
            toast.error('Hubo un error al intentar eliminar la cuenta');
        },
    });
    const [open, setOpen] = React.useState<boolean>(false);
    const [keyword, setKeyword] = React.useState<string>('');

    const onKeywordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => setKeyword(event.target.value);

    const onClose = (): void => {
        setOpen(false);
        setKeyword('');
    };

    const shouldDeleteAccount =
        keyword !== Auth.getAuth()?.user.email || isLoading;

    const onAccountDeletion = () => !shouldDeleteAccount && mutate(undefined);

    return (
        <>
            <Button type="primary" danger onClick={() => setOpen(true)}>
                Eliminar
            </Button>

            <section className={clsx(styles.modal, { [styles.open]: open })}>
                <div className={styles.header}>
                    <p>Eliminación de cuenta</p>

                    <button
                        className={styles.close}
                        type="button"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className={styles.body}>
                    <p>
                        Eliminar la cuenta es un proceso irreversible, si desea
                        continuar, escriba "
                        <strong>{Auth.getAuth()?.user.email}</strong>"
                    </p>

                    <input
                        type="text"
                        onChange={onKeywordChange}
                        value={keyword}
                    />

                    <div className={styles.group}>
                        <Button type="primary" onClick={onClose}>
                            Cancelar
                        </Button>

                        <Button
                            type="primary"
                            danger
                            disabled={
                                keyword !== Auth.getAuth()?.user.email ||
                                isLoading
                            }
                            onClick={onAccountDeletion}
                        >
                            Eliminar
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
DeleteAccountPopup.displayName = 'DeleteAccountPopup';
