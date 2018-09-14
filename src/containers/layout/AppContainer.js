import React        from 'react';
import { hot }      from 'react-hot-loader';
import AppComponent from 'components/layout/AppComponent';

const AppContainer = () => {
    return (
        <AppComponent isUser={false} />
    );
};

export default hot(module)(AppContainer);
