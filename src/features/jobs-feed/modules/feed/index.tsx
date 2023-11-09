import { useFeedStore } from '../../stores/feed';
import { FeedElement } from './feed-element';
import { FeedList } from './feed-list';

import styles from './index.module.scss';

export const Feed = (): JSX.Element => {
    const search = useFeedStore((state) => state.search);

    return (
        <section className={styles.container}>
            <div>
                <header className={styles['jobs-header']}>
                    <p>
                        {search === ''
                            ? 'Resultados basados en el perfil'
                            : `Trabajos de ${search}`}
                    </p>
                    <span>7,652 resultados</span>
                </header>

                <FeedList />
            </div>

            <FeedElement />
        </section>
    );
};

Feed.displayName = 'Feed';
