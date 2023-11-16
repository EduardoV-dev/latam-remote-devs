import React from 'react';
import ResumeIcon from '../../assets/svg/resume.svg?react';
import styles from './index.module.scss';

interface Props {
    accept: string;
    id: string;
}

export const FileInput = ({ accept, id }: Props): JSX.Element => {
    const [file, setFile] = React.useState<File>();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setFile(event.target.files?.[0]);

    return (
        <div className={styles.container}>
            <div>
                <label className={styles.label} htmlFor={id}>
                    Haz clic para buscar en tus archivos
                </label>

                <input
                    {...{ id, accept, onChange }}
                    className={styles.input}
                    type="file"
                />
            </div>

            {file && (
                <div className={styles.preview}>
                    <ResumeIcon />
                    <span>{file.name}</span>
                </div>
            )}
        </div>
    );
};

FileInput.displayName = 'FileInput';
