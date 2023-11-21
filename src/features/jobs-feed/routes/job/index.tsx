import LinkIcon from '@/assets/svg/link.svg?react';
import styles from './index.module.scss';
import { JobsSearchInput } from '../../modules/jobs-search-input';
import { useGetJobById } from '../../api/get-job-by-id';
import { Link, useParams } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes';
import { formatNumber } from '@/utils/number-format';
import { ApplyToJobCTA } from '../../modules/apply-to-job-cta';

export const Job = (): JSX.Element => {
    const { jobId } = useParams();
    const { isLoading, data } = useGetJobById({
        jobId: Number(jobId),
        config: {
            onError: (err) => {
                console.log(err);
            },
        },
    });

    return (
        <>
            <JobsSearchInput />

            {data === null && <p>El trabajo no existe</p>}
            {isLoading || (!data && <p>Cargando...</p>)}

            {!isLoading && data && (
                <section className={styles.container}>
                    <header className={styles.header}>
                        <section className={styles.data}>
                            <p>{data.title}</p>

                            <div className={styles.group}>
                                <Link
                                    to={APP_ROUTES.PUBLIC.COMPANY_DETAILS.replace(
                                        ':id',
                                        data.company.id.toString(),
                                    )}
                                >
                                    {data.company.name}
                                    <LinkIcon />
                                </Link>

                                <span className={styles.salary}>
                                    U$ {formatNumber(data.minSalary)} - U${' '}
                                    {formatNumber(data.maxSalary)}
                                </span>
                            </div>

                            <ApplyToJobCTA jobOfferId={data.id} />
                        </section>

                        <section>
                            <p className={styles.headline}>
                                Habilidades Requeridas
                            </p>

                            <div className="group">
                                {data.JobOfferSkill.map((skill) => (
                                    <span
                                        className="skill-badge"
                                        key={skill.id}
                                    >
                                        {skill.skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </header>

                    <hr className={styles.separator} />

                    <article>
                        <p className={styles.headline}>Detalles de la Oferta</p>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: data.description,
                            }}
                        />
                    </article>
                </section>
            )}
        </>
    );
};

Job.displayName = 'Job';
