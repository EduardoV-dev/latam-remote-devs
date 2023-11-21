import LocationIcon from '@/assets/svg/location.svg?react';
import EmailIcon from '@/assets/svg/email.svg?react';
import TelephoneIcon from '@/assets/svg/telephone.svg?react';
import WebsiteIcon from '../../assets/svg/website.svg?react';
import LinkedInIcon from '../../assets/svg/linkedin.svg?react';

import styles from './index.module.scss';
import { useGetCompanyById } from '../../api/get-company-by-id';
import { useParams } from 'react-router-dom';
import { formatNumber } from '@/utils/number-format';

export const CompanyDetails = (): JSX.Element => {
    const { id } = useParams();
    const { data, isLoading } = useGetCompanyById({
        companyId: Number(id),
    });

    if (!data || isLoading) return <p>Cargando...</p>;
    if (data === null) return <p>La Empresa no existe</p>;

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <div className={styles.data}>
                    <img alt={data.name} src={data.logo} />

                    <div className={styles.information}>
                        <p className={styles.title}>{data.name}</p>

                        {data.address && (
                            <p>
                                <LocationIcon />
                                <p>{data.address}</p>
                            </p>
                        )}
                    </div>
                </div>
            </header>

            <div className={styles.body}>
                <section className={styles.core}>
                    <div>
                        <p>Email</p>
                        <p>
                            <EmailIcon /> {data.email}
                        </p>
                    </div>

                    <div>
                        <p>Teléfono</p>
                        <p>
                            <TelephoneIcon /> {data.telephone}
                        </p>
                    </div>

                    {data.website && (
                        <div>
                            <p>Sitio Web</p>
                            <p>
                                <WebsiteIcon /> {data.website}
                            </p>
                        </div>
                    )}

                    {data.linkedin && (
                        <div>
                            <p>LinkedIn</p>
                            <p>
                                <LinkedInIcon /> {data.linkedin}
                            </p>
                        </div>
                    )}

                    <div>
                        <p>Empleados</p>
                        <p>{formatNumber(data.totalEmployes)}</p>
                    </div>
                </section>

                <section dangerouslySetInnerHTML={{ __html: data.about }} />
            </div>
        </section>
    );
};
