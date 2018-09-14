import React, { Component } from 'react';
import { ApolloProvider }               from 'react-apollo';
import { ApolloClient }                 from 'apollo-client';
import { ApolloLink }                   from 'apollo-link';
import { setContext }                   from 'apollo-link-context';
import { createHttpLink }               from 'apollo-link-http';
import { InMemoryCache }                from 'apollo-cache-inmemory';

class PersistApolloProvider extends Component {
    state = {
        client: null,
        loaded: false,
    };

    async componentDidMount() {

        const httpLink = createHttpLink({
            uri: 'https://api.github.com/graphql',
        });

        const authLink = setContext(( _, { headers } ) => {
            // get the authentication token from local storage if it exists
            const token = localStorage.getItem('token');
            // return the headers to the context so httpLink can read them
            return token ? {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                }
            } : {
                headers: {
                    ...headers,
                }
            };
        });

        const cache = new InMemoryCache();

        // Setup your Apollo Link, and any other Apollo packages here.
        const client = new ApolloClient({
            cache,
            link: ApolloLink.from([
                authLink,
                httpLink,
            ]),
        });

        this.setState({
            client,
            loaded: true,
        });
    }

    render() {
        const { client, loaded } = this.state;
        const { children } = this.props;

        if ( !loaded ) {
            return 'is loading';
        }

        return (
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        );
    }
}

export default PersistApolloProvider;
