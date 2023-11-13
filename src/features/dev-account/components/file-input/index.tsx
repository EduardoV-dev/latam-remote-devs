import styles from './index.module.scss';

interface Props {
    accept: string;
    id: string;
}

export const FileInput = ({ accept, id }: Props): JSX.Element => (
    <>
        <label className={styles.label} htmlFor={id}>
            Haz clic para buscar en tus archivos
        </label>

        <input {...{ id, accept }} className={styles.input} type="file" />
    </>
);

FileInput.displayName = 'FileInput';
