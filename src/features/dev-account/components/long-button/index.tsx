import PlusIcon from '../../assets/svg/plus.svg?react';
import styles from './index.module.scss';

interface Props {
    onClick: () => void;
    text: string;
}

export const LongButton = ({ onClick, text }: Props): JSX.Element => (
    <button {...{ onClick }} className={styles.button} type="button">
        {text}
        <PlusIcon />
    </button>
);

LongButton.displayName = 'LongButton';
