import PropTypes          from 'prop-types';
import React, { Fragment, Component }              from 'react';
import { Route, Switch, Redirect }  from 'react-router-dom';
import RootComponent      from 'components/pages/RootComponent';
import HistoryContainer from 'containers/pages/HistoryContainer';
import { ROUTES, LAYOUT, AUTH_ROUTES } from '_constants';
import selectLayout       from 'utils/selectLayout';
import styles             from './styles.scss';
import classNames         from 'classnames/bind';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const cx = classNames.bind(styles);

class PreventUnexpectedReRender extends Component {
    shouldComponentUpdate = ( nextProps ) => false;

    render() {
        return this.props.children;
    }
}

const MainComponent = ( props ) => {
    const { location, intl } = props;
    const layout = selectLayout(location);

    const time = +styles.time.slice(0, -2);
    return (
        <Fragment>
            <TransitionGroup component={null}>
                <CSSTransition
                    key={location.key}
                    timeout={time}
                    classNames={{
                        enter: styles.routeEnter,
                        enterActive: styles.routeEnterActive,
                        exit: styles.routeExit,
                        exitActive: styles.routeExitActive,
                    }}
                >
                    <main className={ cx(styles.main, { [ styles.mainDashboard ]: layout === LAYOUT.DASHBOARD }) }>
                        <PreventUnexpectedReRender>
                            <Switch location={location}>
                                <Route
                                    exact
                                    path={ ROUTES.ROOT }
                                    component={ RootComponent }
                                />

                                <Route
                                    exact
                                    path={ ROUTES.HISTORY }
                                    component={ HistoryContainer }
                                />
                            </Switch>
                        </PreventUnexpectedReRender>
                    </main>
                </CSSTransition>
            </TransitionGroup>
        </Fragment>
    );
};
MainComponent.propTypes = {
    location: PropTypes.object.isRequired,
};

export default MainComponent;
