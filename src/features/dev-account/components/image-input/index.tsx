import React from 'react';
import styles from './index.module.scss';

interface Props {
    id: string;
}

interface ImageState {
    file?: File;
    preview?: string | ArrayBuffer | null;
}

const toBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const ImageInput = ({ id }: Props): JSX.Element => {
    const [state, setState] = React.useState<ImageState>({});

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const preview = await toBase64(file);
        setState({ file, preview });
    };

    return (
        <div className={styles.container}>
            <div>
                <label className={styles.label} htmlFor={id}>
                    Haz clic para buscar en tus archivos
                </label>

                <input
                    {...{ id, onChange }}
                    accept="image/*"
                    className={styles.input}
                    type="file"
                />
            </div>

            {state.preview && (
                <figure className={styles.preview}>
                    <img alt="preview" src={state.preview.toString()} />
                </figure>
            )}
        </div>
    );
};

ImageInput.displayName = 'ImageInput';
