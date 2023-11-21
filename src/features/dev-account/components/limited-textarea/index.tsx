import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface Props {
    maxCharacters: number;
    onChange: (value: string) => void;
    initialValue?: string;
}

export const LimitedTextArea = ({
    maxCharacters,
    onChange,
    initialValue,
}: Props): JSX.Element => {
    const [value, setValue] = React.useState<string>('');

    React.useEffect(() => {
        if (initialValue) setValue(initialValue);
    }, [initialValue]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newInput: string = event.target.value;
        const isLimitReached: boolean = newInput.length > maxCharacters;
        if (isLimitReached) return;

        setValue(newInput);
        onChange(newInput);
    };

    return (
        <div className={styles.container}>
            <textarea {...{ value }} onChange={handleChange} />

            <p className={styles.words}>
                <span
                    className={clsx(styles.words__count, {
                        [styles.done]: value.length === maxCharacters,
                    })}
                >
                    {value.length}
                </span>{' '}
                / {maxCharacters}
            </p>
        </div>
    );
};

LimitedTextArea.displayName = 'LimitedTextArea';
