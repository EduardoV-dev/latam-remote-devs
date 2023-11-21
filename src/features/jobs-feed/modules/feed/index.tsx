import { useFeedStore } from '../../stores/feed';
import { FeedElement } from './feed-element';
import { FeedList } from './feed-list';

import styles from './index.module.scss';

export const Feed = (): JSX.Element => {
    const search = useFeedStore((state) => state.search);
    const results = useFeedStore((state) => state.results);
    const filterBySkills = useFeedStore((state) => state.filterBySkills);

    const getFeedMessage = (): string => {
        if (filterBySkills) return 'Resultados basados en el perfil';
        if (search !== '') return `Trabajos de ${search}`;
        return 'Resultados más recientes';
    };

    return (
        <section className={styles.container}>
            <div>
                <header className={styles['jobs-header']}>
                    <p>{getFeedMessage()}</p>
                    {results ? <span>{results} resultados</span> : ''}
                    {results === 0 ? <span>Sin resultados</span> : ''}
                </header>

                <FeedList />
            </div>

            <FeedElement />
        </section>
    );
};

Feed.displayName = 'Feed';
