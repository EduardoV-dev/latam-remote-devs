import React from 'react';

interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props): JSX.Element => (
    <>
        <header>Hello world</header>
        <main>{children}</main>
        <footer>Bye world</footer>
    </>
);
