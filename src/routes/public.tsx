import { APP_ROUTES } from '@/config/routes';
import { RouterItem } from '@/types/general';
import { PublicRouteWrapping } from './wrappers/public';

export const publicRoutes: RouterItem[] = [
    {
        element: <PublicRouteWrapping />,
        path: '/',
        children: [
            {
                path: APP_ROUTES.PUBLIC.HOMEPAGE,
                element: <h1>Hello world</h1>,
            },
        ],
    },
];
