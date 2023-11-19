export const APP_ROUTES = {
    PUBLIC: {
        JOBS: '/jobs',
        AUTH: '/auth',
    },
    PRIVATE: {
        DEV: {
            ACCOUNT: {
                BASE: '/dev/account',
                NEW: '/dev/account/new',
                EDIT: '/dev/account/information',
            },
            JOBS: '/dev/jobs',
        },
    },
};
