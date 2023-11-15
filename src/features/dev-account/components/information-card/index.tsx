import { Button } from 'antd';
import styles from './index.module.scss';
import CloseIcon from '@/assets/svg/close.svg?react';

interface Props {
    title: string;
    dates: {
        start: string;
        end: string;
    };
    place: string;
    description: string;
    onRemove: () => void;
}

export const InformationCard = ({
    dates,
    description,
    place,
    title,
    onRemove,
}: Props): JSX.Element => (
    <div className={styles.card}>
        <Button onClick={onRemove} className={styles.card__remove} type="text">
            <CloseIcon />
        </Button>

        <header className={styles.header}>
            <p>{title}</p>
            <small>
                {dates.start} - {dates.end}
            </small>
        </header>

        <p className={styles.card__location}>{place}</p>
        <p className={styles.card__description}>{description}</p>
    </div>
);

InformationCard.displayName = 'InformationCard';
