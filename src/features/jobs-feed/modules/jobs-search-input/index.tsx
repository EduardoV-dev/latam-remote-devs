import { Input, Button } from 'antd';
import React from 'react';

import SearchIcon from '../../assets/svg/search.svg?react';

import styles from './index.module.scss';
import { useFeedStore } from '../../stores/feed';

export const JobsSearchInput = (): JSX.Element => {
    const setSearchInStore = useFeedStore((state) => state.setSearch);
    const [search, setSearch] = React.useState<string>('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
        setSearch(event.target.value);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setSearchInStore(search);
    };

    return (
        <form {...{ onSubmit }} className={styles.container}>
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
