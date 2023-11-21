import { APP_ROUTES } from '@/config/routes';
import { Link } from 'react-router-dom';
import LinkIcon from '@/assets/svg/link.svg?react';
import styles from './index.module.scss';
import { Postulation } from '../../types/postulation';

const JOB_STATE = {
    Opened: 'Abierta',
    Closed: 'Cerrada',
};

const OFFER_STATE = {
    Pending: 'En proceso',
    Rejected: 'Rechazado',
    Accepted: 'Contratado',
};

export const JobItem = ({
    postulation,
}: {
    postulation: Postulation;
}): JSX.Element => {
    return (
        <div className={styles.job}>
            <p className={styles['job-title']}>
                {postulation.jobOffer.title}{' '}
                <small>Aplicado en 11/02/2023</small>
            </p>

            <p className={styles['job-company']}>
                <Link
                    to={APP_ROUTES.PUBLIC.COMPANY_DETAILS.replace(
                        ':id',
                        postulation.jobOffer.company.id.toString(),
                    )}
                >
                    {postulation.jobOffer.company.name}
                    <LinkIcon />
                </Link>

                <span>
                    {JOB_STATE[
                        postulation.jobOffer.state as keyof typeof JOB_STATE
                    ] || postulation.jobOffer.state}
                </span>
            </p>

            <div className={styles['job-actions']}>
                <span>
                    {OFFER_STATE[
                        postulation.state as keyof typeof OFFER_STATE
                    ] || postulation.state}
                </span>
            </div>
        </div>
    );
};
