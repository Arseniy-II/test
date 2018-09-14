const
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    WebpackPwaManifest = require('webpack-pwa-manifest'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
autoprefixer = require('autoprefixer');

const
    publicFolder = path.resolve(__dirname, 'build'),
    srcFolder = path.resolve(__dirname, 'src');

// === PLUGINS ===
const htmlWebPackPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
});
const miniCssExtractPlugin = new MiniCssExtractPlugin();
const defineVariablesPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        STAGE: JSON.stringify(process.env.STAGE),
        APP: JSON.stringify(process.env.APP),
    },
});
const serviceWorkerWebpackPlugin = new ServiceWorkerWebpackPlugin({
    entry: path.resolve(srcFolder, 'service-worker.js'),
    filename: 'service-worker.js'
});
const cleanWebpackPlugin = new CleanWebpackPlugin([publicFolder]);
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    generateStatsFile: true,
    statsFilename: 'stats.json',
});

// === CONFIG ===
const config = {
    resolve: {
        modules: [ srcFolder, 'node_modules', ],
        extensions: [ '.js', ],
    },

    devServer: {
        port: 8090,
        contentBase: publicFolder,
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'https://api.for.stage',
                pathRewrite: { '^/api': '', },
                secure: false,
                changeOrigin: true,
            },
        },
    },

    entry: [
        path.resolve(srcFolder, 'styles.scss'),
        path.resolve(srcFolder, 'index.js'),
    ],

    output: {
        publicPath: !process.env.APP ? '/' : './',
        path: publicFolder,
    },

    module: {

        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
                include: [path.resolve(__dirname, 'asdf/index.js'), srcFolder]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, // css imported to js will be as object
                            importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: [ '> 1%', ],
                                }),
                            ],
                        },
                    },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(srcFolder, 'assets/scss/_variables.scss'),
                                path.resolve(srcFolder, 'assets/scss/_mixins.scss'),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpeg|jpg|svg|gif)$/,
                loader: 'file-loader?name=images/[name].[ext]',
            },

            {
                test: /\.(otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },

        ]
    },
    plugins: [
        htmlWebPackPlugin,
        miniCssExtractPlugin,
        defineVariablesPlugin,
        new webpack.NamedModulesPlugin(),
    ]
};

// === ENV PLUGIN CUSTOMIZATION ===
if ( process.env.ANALYZE ) {
    config.plugins.push(
        bundleAnalyzerPlugin
    );
}
if ( process.env.NODE_ENV === 'production') {
    config.plugins.push(
        cleanWebpackPlugin
    );
}
if ( process.env.NODE_ENV === 'production' && !process.env.APP ) { // Only on production (not compatible with HMR)
    config.plugins.push(
        serviceWorkerWebpackPlugin
    );
}
module.exports = config;
