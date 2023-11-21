export const APP_ROUTES = {
    PUBLIC: {
        JOBS: '/jobs',
        AUTH: '/auth',
        COMPANY_DETAILS: '/jobs/company/:id',
    },
    PRIVATE: {
        DEV: {
            ACCOUNT: {
                BASE: '/dev/account',
                NEW: '/dev/account/new',
                EDIT: '/dev/account/information',
                JOBS: '/dev/account/jobs',
                CHANGE_PASSWORD: '/dev/account/change-password',
            },
        },
    },
};
