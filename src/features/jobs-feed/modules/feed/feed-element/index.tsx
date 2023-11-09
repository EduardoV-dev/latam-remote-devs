import { Button } from 'antd';
import { useFeedStore } from '@/features/jobs-feed/stores/feed';
import CloseIcon from '@/assets/svg/close.svg?react';
import LinkIcon from '@/assets/svg/link.svg?react';
import styles from './index.module.scss';

export const FeedElement = (): JSX.Element => {
    const { jobId, setJobId } = useFeedStore();

    if (!jobId) return <></>;

    const hideFeedElement = (): void => setJobId(null);

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
                        <p>Senior React Developer</p>

                        <span>
                            Nowoptics <LinkIcon />
                        </span>
                    </div>

                    <Button type="primary">Aplicar</Button>
                </div>
            </header>
            <div className={styles.body}>
                <p className={styles.headline}>Habilidades Requeridas</p>

                <div className="group">
                    <span className="skill-badge">React</span>
                    <span className="skill-badge">React</span>
                    <span className="skill-badge">React</span>
                    <span className="skill-badge">React</span>
                    <span className="skill-badge">React</span>
                    <span className="skill-badge">React</span>
                    <span className="skill-badge">React</span>
                    <span className="skill-badge">React</span>
                </div>

                <p className={styles.headline}>Detalles de la Oferta</p>

                <article>
                    {[...new Array(15)].map(() => (
                        <p>
                            sed. Pretium aenean pharetra magna ac placerat
                            vestibulum lectus mauris ultrices. Sed euismod nisi
                            porta lorem mollis aliquam ut porttitor leo. Semper
                            eget duis at tellus at urna condimentum. Mi proin
                            sed libero enim sed faucibus turpis in. Urna nunc id
                            cursus metus aliquam eleifend mi in nulla. Augue
                            neque gravida in fermentum.
                        </p>
                    ))}
                </article>
            </div>
        </section>
    );
};
