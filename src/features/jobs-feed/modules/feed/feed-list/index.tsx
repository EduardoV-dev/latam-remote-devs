import { useFeedStore } from '@/features/jobs-feed/stores/feed';
import styles from './index.module.scss';

export const FeedList = (): JSX.Element => {
    const setJobId = useFeedStore((state) => state.setJobId);

    return (
        <section className={styles.list}>
            {[...new Array(10)].map((_, index) => (
                <div
                    className={styles.item}
                    onClick={() => setJobId(index.toString())}
                >
                    <p className={styles.item__title}>Senior React Developer</p>
                    <p className={styles.item__company}>Nowoptics</p>

                    <span className={styles.item__range}>
                        U$ 50,000 - U$ 60,000
                    </span>

                    <p>
                        Nowoptics is seeking a Senior UI Developer to be part of
                        the mission solution and help lead SSA’s Digital
                        Modernization Strategy. Join one of our high performing
                        teams responsible. Nowoptics is seeking a Senior UI
                        Developer to be part of the mission solution and help
                        lead SSA’s Digital Modernization Strategy. Join one of
                        our high performing teams responsible
                    </p>

                    <small className={styles.item__published}>
                        Publicado hace 4 días
                    </small>
                </div>
            ))}
        </section>
    );
};

FeedList.displayName = 'FeedList';
