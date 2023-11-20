import LocationIcon from '@/assets/svg/location.svg?react';
import EmailIcon from '@/assets/svg/email.svg?react';
import TelephoneIcon from '@/assets/svg/telephone.svg?react';
import ChevronRightIcon from '../../assets/svg/chevron-right.svg?react';

import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes';
import { Auth } from '@/lib/auth';

export const AboutBrief = (): JSX.Element => {
    const user = Auth.getAuth()!.user;

    return (
        <>
            <header className={styles.header}>
                <p>{`${user.developer?.firstName} ${user.developer?.lastName}`}</p>

                {user.photoUrl && (
                    <img alt="profile picture" src={user.photoUrl} />
                )}
            </header>

            <Link
                className={styles.information}
                to={APP_ROUTES.PRIVATE.DEV.ACCOUNT.EDIT}
            >
                <div>
                    <p>
                        <EmailIcon /> {user.email}
                    </p>
                    <p>
                        <TelephoneIcon /> {user.developer?.telephone}
                    </p>
                    <p>
                        <LocationIcon /> {user.developer?.city},{' '}
                        {user.developer?.country}{' '}
                        {user.developer?.address &&
                            `| ${user.developer.address}`}
                    </p>
                </div>

                <ChevronRightIcon />
            </Link>
        </>
    );
};
