export const ROUTES = {
    ROOT: '/',
    SIGN_IN: '/sign_in',
    SIGN_UP: '/sign_up',

    DASHBOARD: '/dashboard',
    INVEST_CURRENCY_SELECT: '/select_currency',
    INVEST_FIRST: '/invest_first',
    INVEST: '/invest',
    HISTORY: '/history',
    SETTINGS: '/settings',
};

export const AUTH_ROUTES = [
    ROUTES.INVEST_FIRST,
    ROUTES.DASHBOARD,
    ROUTES.INVEST_CURRENCY_SELECT,
    ROUTES.INVEST,
    ROUTES.HISTORY,
    ROUTES.SETTINGS,
];

export const LAYOUT = {
    DASHBOARD: 'dashboardLayout',
    START: 'startLayout'
};
