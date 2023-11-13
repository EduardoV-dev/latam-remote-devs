import React from 'react';
import styles from './index.module.scss';

interface Props {
    children: React.ReactNode;
    title: string;
}

export const TwoColumnedSection = ({ children, title }: Props): JSX.Element => (
    <section className={styles.container}>
        <p className={styles.title}>{title}</p>
        <div>{children}</div>
    </section>
);

TwoColumnedSection.displayName = 'TwoColumnedSection';
