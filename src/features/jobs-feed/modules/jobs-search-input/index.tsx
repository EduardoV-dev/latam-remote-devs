import { Input, Button } from 'antd';
import React from 'react';

import SearchIcon from '../../assets/svg/search.svg?react';

import styles from './index.module.scss';
import { useFeedStore } from '../../stores/feed';
import { Auth } from '@/lib/auth';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes';

export const JobsSearchInput = (): JSX.Element => {
    const feedStore = useFeedStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = React.useState<string>(feedStore.search);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
        setSearch(event.target.value);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        feedStore.setSearch(search);
        feedStore.setFilterBySkills(false);
        feedStore.setJob(null);

        if (location.pathname !== APP_ROUTES.PUBLIC.JOBS)
            navigate(APP_ROUTES.PUBLIC.JOBS);
    };

    return (
        <div
            className={clsx(styles.container, {
                [styles.large]: Auth.getAuth() !== null,
            })}
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.wrapper}>
                    <SearchIcon />

                    <Input
                        {...{ onChange }}
                        className="no-focus"
                        placeholder="Busca por Título del Trabajo o Palabras Clave"
                        value={search}
                    />
                </div>

                <Button type="primary">Buscar</Button>
            </form>

            {Auth.getAuth() ? (
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={feedStore.filterBySkills}
                        onChange={(event) =>
                            feedStore.setFilterBySkills(event.target.checked)
                        }
                    />
                    Obtener resultados en base al perfil
                </label>
            ) : null}
        </div>
    );
};

JobsSearchInput.displayName = 'JobsSearchInput';
