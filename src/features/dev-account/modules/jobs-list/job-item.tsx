import { APP_ROUTES } from '@/config/routes';
import { Link } from 'react-router-dom';
import LinkIcon from '@/assets/svg/link.svg?react';
import { Button } from 'antd';
import styles from './index.module.scss';
import React from 'react';

export const JobItem = (): JSX.Element => {
    const [isEditingState, setIsEditingState] = React.useState<boolean>(false);
    const [state, setState] = React.useState<string>('En proceso');

    const onStateChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
        setState(event.target.value);

    const openStateChange = (): void => setIsEditingState(true);

    const changeState = (): void => {
        // ...
        setIsEditingState(false);
    };

    return (
        <div className={styles.job}>
            <p className={styles['job-title']}>
                Senior React Developer <small>Aplicado en 11/02/2023</small>
            </p>

            <p className={styles['job-company']}>
                <Link
                    to={APP_ROUTES.PUBLIC.COMPANY_DETAILS.replace(':id', '1')}
                >
                    Nowoptics
                    <LinkIcon />
                </Link>

                <span>Cerrado</span>
            </p>

            <div className={styles['job-actions']}>
                {isEditingState ? (
                    <select onChange={onStateChange} value={state}>
                        <option value="" hidden>
                            Seleccionar estado
                        </option>
                        <option value="En proceso">En proceso</option>
                        <option value="Contratado">Contratado</option>
                        <option value="Rechazado">Rechazado</option>
                        <option value="No interesado">No interesado</option>
                    </select>
                ) : (
                    <span>{state}</span>
                )}

                <Button
                    type="primary"
                    onClick={isEditingState ? changeState : openStateChange}
                >
                    {isEditingState ? 'Aceptar Estado' : 'Cambiar Estado'}
                </Button>
            </div>
        </div>
    );
};
