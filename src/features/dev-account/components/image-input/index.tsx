import React from 'react';
import styles from './index.module.scss';

const toBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface Props {
    id: string;
    onChange: (file: File) => void;
    initialValue?: string;
}

interface ImageState {
    file?: File;
    preview?: string | ArrayBuffer | null;
}

export const ImageInput = ({
    id,
    onChange: changeEvent,
    initialValue,
}: Props): JSX.Element => {
    const [state, setState] = React.useState<ImageState>({
        preview: initialValue,
    });

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const preview = await toBase64(file);
        setState({ file, preview });
        changeEvent(file);
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
