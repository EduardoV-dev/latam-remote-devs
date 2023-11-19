import { RouterItem } from '@/types/general';
import { lazyImport } from '@/utils/lazy-import';
import { RouterWrapper } from './wrapper';
import { APP_ROUTES } from '@/config/routes';

const { DevAccountRoutes } = lazyImport(
    () => import('@/features/dev-account'),
    'DevAccountRoutes',
);

export const devRoutes: RouterItem[] = [
    {
        element: <RouterWrapper />,
        path: '/',
        children: [
            {
                element: <DevAccountRoutes />,
                path: `${APP_ROUTES.PRIVATE.DEV.ACCOUNT.BASE}/*`,
            },
        ],
    },
];
