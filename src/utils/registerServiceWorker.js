const getComponent = () => {
    return import(/* webpackChunkName: "serviceworker" */ 'serviceworker-webpack-plugin/lib/runtime')
        .then(( { default: runtime } ) => {
            if ( 'serviceWorker' in navigator ) {
                // const registration = runtime.register();
                runtime.register();
            }
        }).catch(error => 'An error occurred while loading the component');
};

if ( process.env.NODE_ENV === 'production' && !process.env.APP) {
    getComponent();
}
