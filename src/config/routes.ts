export const APP_ROUTES = {
    PUBLIC: {
        JOBS: '/jobs',
        AUTH: '/auth',
        COMPANY_DETAILS: '/company/:id',
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
