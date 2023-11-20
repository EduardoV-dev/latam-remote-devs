import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
// import jwtDecode from 'jwt-decode';

import { DeveloperAccountDAO, DeveloperLogin } from '@/features/dev-account';
import { AuthResponse } from '@/types/auth';
import { FIRST_TIME_AUTH, TOKEN_KEY } from '@/config/sessions';

export interface UserDeveloper {
    id: number;
    email: string;
    role: string;
    photoUrl?: string;
    developer?: DeveloperLogin | null;
}

export type UserDeveloperResponse = AuthResponse<UserDeveloper>;

export class Auth {
    public static saveAuth = (user: UserDeveloperResponse): void => {
        setCookie(TOKEN_KEY, JSON.stringify(user), {
            sameSite: 'Strict',
            expires: 1,
            secure: import.meta.env.PROD,
            path: '/',
        });
    };

    public static getAuth = (): UserDeveloperResponse | null => {
        const cookie: string | undefined = getCookie(TOKEN_KEY);
        if (!cookie) return null;
        return JSON.parse(cookie) as UserDeveloperResponse;
    };

    public static logout = (): void => {
        removeCookie(TOKEN_KEY);
    };

    public static logoutReload = (): void => {
        this.logout();
        window.location.reload();
    };

    public static saveFirstLogin = (isFirstLogin: boolean): void => {
        setCookie(FIRST_TIME_AUTH, JSON.stringify(isFirstLogin ? 1 : 0), {
            sameSite: 'Strict',
            expires: 1,
            secure: import.meta.env.PROD,
            path: '/',
        });
    };

    public static isFirstLogin = (): boolean => {
        const cookie = getCookie(FIRST_TIME_AUTH);
        if (!cookie) return false;
        return Boolean(JSON.parse(cookie));
    };

    public static updateAuth = (
        developer: DeveloperAccountDAO & { picture: string },
    ) => {
        const cookie = getCookie(TOKEN_KEY);
        if (!cookie) return;
        const cookieData: UserDeveloperResponse = JSON.parse(cookie);
        const newData: UserDeveloperResponse = {
            ...cookieData,
            user: {
                ...cookieData.user,
                photoUrl: developer.picture,
                developer: { ...developer },
            },
        };
        setCookie(TOKEN_KEY, JSON.stringify(newData), {
            path: '/',
            expires: 1,
            secure: import.meta.env.PROD,
            sameSite: 'Strict',
        });
    };
}
