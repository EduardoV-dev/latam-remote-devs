import React from 'react';
import ResumeIcon from '../../assets/svg/resume.svg?react';
import styles from './index.module.scss';

interface Props {
    id: string;
    onChange: (file: File) => void;
    initialValue?: string;
}

export const FileInput = ({
    id,
    onChange: handleChange,
    initialValue,
}: Props): JSX.Element => {
    const [file, setFile] = React.useState<File>();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFile(file);
        handleChange(file);
    };

    return (
        <div className={styles.container}>
            <div>
                <label className={styles.label} htmlFor={id}>
                    Haz clic para buscar en tus archivos
                </label>

                <input
                    {...{ id, onChange }}
                    accept="application/pdf"
                    className={styles.input}
                    type="file"
                />
            </div>

            {(file || initialValue) && (
                <div className={styles.preview}>
                    <ResumeIcon />
                    <span>{initialValue ? 'Resume.pdf' : file?.name}</span>
                </div>
            )}
        </div>
    );
};

FileInput.displayName = 'FileInput';
