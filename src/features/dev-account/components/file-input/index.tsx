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
            <div className={styles.element}>
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

            {file && (
                <div className={styles.preview}>
                    <ResumeIcon />
                    <span>{file.name}</span>
                </div>
            )}

            {!file && initialValue && (
                <a
                    className={styles.preview}
                    href={initialValue}
                    target="_blank"
                >
                    <ResumeIcon />
                    <span>Resume.pdf</span>
                </a>
            )}
        </div>
    );
};

FileInput.displayName = 'FileInput';
