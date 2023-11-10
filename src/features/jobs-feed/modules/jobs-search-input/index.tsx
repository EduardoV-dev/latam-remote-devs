import { Input, Button } from 'antd';
import React from 'react';

import SearchIcon from '../../assets/svg/search.svg?react';

import styles from './index.module.scss';
import { APP_ROUTES } from '@/config/routes';
import { useNavigate } from 'react-router-dom';
import { useFeedStore } from '../../stores/feed';

export const JobsSearchInput = (): JSX.Element => {
    const navigate = useNavigate();
    const feedStore = useFeedStore();
    const [search, setSearch] = React.useState<string>(feedStore.search);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
        setSearch(event.target.value);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        feedStore.setSearch(search);
        navigate(
            `${APP_ROUTES.PUBLIC.JOBS}?search=${encodeURIComponent(search)}`,
        );
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.wrapper}>
                <SearchIcon />

                <Input
                    {...{ onChange }}
                    placeholder="Busca por Título del Trabajo o Palabras Clave"
                    value={search}
                />
            </div>

            <Button type="primary">Buscar</Button>
        </form>
    );
};

JobsSearchInput.displayName = 'JobsSearchInput';
