import React from 'react';
import { DEPOSIT } from '_constants'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import HistoryComponent          from 'components/pages/HistoryComponent';

const DEPOSIT_SUMMARY = gql`
    {
        __schema
    }

`;

const DashboardContainer = (props) => {
    return (
        <Query query={DEPOSIT_SUMMARY} >
            {({data, loading, error}) => {
                console.log({data, loading, error});
                if (loading) return 'is loading';
                if (error) return 'error';
                return (
                    <HistoryComponent depositInvestments={data.depositInvestments}/>
                )
            }}
        </Query>
    );
};

export default DashboardContainer;
