import * as React from 'react';

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export const lazyImport = <
    T extends React.ComponentType<any>,
    // eslint-disable-next-line no-use-before-define
    I extends { [K2 in K]: T },
    K extends keyof I,
>(
    factory: () => Promise<I>,
    name: K,
): I =>
    Object.create({
        [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
    });

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");