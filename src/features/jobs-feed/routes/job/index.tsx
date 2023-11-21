import LinkIcon from '@/assets/svg/link.svg?react';
import styles from './index.module.scss';
import { Button } from 'antd';
import { JobsSearchInput } from '../../modules/jobs-search-input';
import { useGetJobById } from '../../api/get-job-by-id';
import { Link, useParams } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes';

export const Job = (): JSX.Element => {
    const { jobId } = useParams();
    const { isLoading, data, error } = useGetJobById({
        jobId: Number(jobId),
        config: {
            onError: (err) => {
                console.log(err);
            },
        },
    });

    if (isLoading || !data) return <p>Cargando...</p>;

    console.log(data, error);

    return (
        <>
            <JobsSearchInput />

            <section className={styles.container}>
                <header className={styles.header}>
                    <section className={styles.data}>
                        <p>{data.title}</p>

                        <div className={styles.group}>
                            <Link
                                to={APP_ROUTES.PUBLIC.COMPANY_DETAILS.replace(
                                    ':id',
                                    data.companyId.toString(),
                                )}
                            >
                                {data.companyId}
                                <LinkIcon />
                            </Link>

                            <span className={styles.salary}>
                                U$ {data.minSalary} - U$ {data.maxSalary}
                            </span>
                        </div>

                        <Button type="primary">Aplicar</Button>
                    </section>

                    <section>
                        <p className={styles.headline}>
                            Habilidades Requeridas
                        </p>

                        <div className="group">
                            {data.JobOfferSkill.map((skill) => (
                                <span className="skill-badge" key={skill.id}>
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
                        dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                </article>
            </section>
        </>
    );
};

Job.displayName = 'Job';
