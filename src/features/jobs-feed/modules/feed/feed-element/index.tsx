import { Button } from 'antd';
import { useFeedStore } from '@/features/jobs-feed/stores/feed';
import CloseIcon from '@/assets/svg/close.svg?react';
import LinkIcon from '@/assets/svg/link.svg?react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes';
import { ApplyToJobCTA } from '../../apply-to-job-cta';

export const FeedElement = (): JSX.Element => {
    const { job, setJob } = useFeedStore();

    if (!job) return <></>;

    const hideFeedElement = (): void => setJob(null);

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <Button
                    className={styles.header__exit}
                    type="text"
                    onClick={hideFeedElement}
                >
                    <CloseIcon />
                </Button>

                <div className={styles.group}>
                    <div className={styles.data}>
                        <Link to={job.id.toString()}>{job.title}</Link>

                        <Link
                            to={APP_ROUTES.PUBLIC.COMPANY_DETAILS.replace(
                                ':id',
                                job.company.id.toString(),
                            )}
                        >
                            {job.company.name} <LinkIcon />
                        </Link>
                    </div>

                    <ApplyToJobCTA jobOfferId={job.id} />
                </div>
            </header>
            <div className={styles.body}>
                <p className={styles.headline}>Habilidades Requeridas</p>

                <div className="group">
                    {job.JobOfferSkill.map(({ skill }) => (
                        <span
                            key={skill.id + skill.name}
                            className="skill-badge"
                        >
                            {skill.name}
                        </span>
                    ))}
                </div>

                <p className={styles.headline}>Detalles de la Oferta</p>

                <article
                    dangerouslySetInnerHTML={{ __html: job.description }}
                />
            </div>
        </section>
    );
};
