import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';
import CloseIcon from '@/assets/svg/close.svg?react';
import clsx from 'clsx';
import { Auth } from '@/lib/auth';

export const DeleteAccountPopup = (): JSX.Element => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [keyword, setKeyword] = React.useState<string>('');

    const onKeywordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => setKeyword(event.target.value);

    const onAccountDeletion = (): void => {
        console.log('account deleted');
        setOpen(false);
    };

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
                        onClick={() => setOpen(false)}
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
                        <Button type="primary" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>

                        <Button
                            type="primary"
                            danger
                            disabled={keyword !== Auth.getAuth()?.user.email}
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
