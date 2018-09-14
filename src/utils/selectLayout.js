import { ROUTES, LAYOUT } from '../_constants';

/**
 * Select proper layout for app
 *
 * @param {Object} location - route location
 * @returns {string}
 */
const selectLayout = ( location ) => {
    const DASHBOARD_ROUTES = [
        ROUTES.DASHBOARD,
        ROUTES.INVEST,
        ROUTES.INVEST_FIRST,
        ROUTES.INVEST_CURRENCY_SELECT,
        ROUTES.HISTORY,
        ROUTES.SETTINGS,
    ];
    return DASHBOARD_ROUTES.indexOf(location.pathname) !== -1 ? LAYOUT.DASHBOARD : LAYOUT.START;
};

export default selectLayout;
