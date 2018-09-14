import React, { Fragment } from 'react';
import PropTypes           from 'prop-types';
import { withRouter }      from 'react-router';
import HeaderComponent     from 'components/layout/HeaderComponent';
import MainComponent       from 'components/layout/MainComponent';
import './styles.scss';

const AppComponent = ( props ) => {
    const { location } = props;

    return (
        <Fragment>
            <HeaderComponent location={ location } />
            <MainComponent location={ location } />
        </Fragment>
    );
};

AppComponent.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(AppComponent);
