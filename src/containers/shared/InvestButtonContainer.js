import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import InvestButtonComponent from 'components/shared/InvestButtonComponent';
import { withRouter } from 'react-router'
import {ROUTES} from '_constants';

const INVEST = gql`
    mutation investRequest {
        investRequest
    }
`;

const InvestButtonContainer = (props) => {
    const {history, children} = props;
    const handleNotificationAction = () => {
        props.history.push(ROUTES.DASHBOARD);
    };
    return (
        <Mutation
            mutation={INVEST}
        >
            {( investRequest, { loading, data, error } ) => (
                <InvestButtonComponent
                    handleInvest={investRequest}
                    data={data}
                    loading={loading}
                    error={error}
                    handleNotificationAction={handleNotificationAction}
                >
                    {children}
                </InvestButtonComponent>
            )}
        </Mutation>
    );
};

InvestButtonContainer.propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(InvestButtonContainer);
