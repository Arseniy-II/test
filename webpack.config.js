const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UrlLoader         = require('url-loader');


publicFolder = path.resolve(__dirname, 'public');
appFolder = path.resolve(__dirname, 'app');

module.exports = {

    resolve: {
        modules: [ publicFolder, appFolder ],
        extensions: [ '.js', ],
    },

    entry: {
        main: './public/es/index.js'
    },
    output: {
        path:       path.resolve(__dirname, 'public/js/'),
        filename:   'bundle.js'
    },
    module: {
        rules: [
            {
                test:       /\.js$/,
                exclude:    /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, // edited
            hash: true,
            template: './public/index.html', // edited
            filename: 'index.html'
        })
    ],
    devServer: {
        port:           3000,
        contentBase:    __dirname + '/public/js',
        inline:         true
    }

};
