const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    GenerateSW
} = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode,
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs'),
        clean: true
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Decision Matrix',
            favicon: './public/assets/favicon.png',
            template: './src/index.ejs',
            meta: {
                'mobile-web-app-capable': 'yes',
                'apple-mobile-web-app-capable': 'yes',
                'application-name': 'Decision Matrix',
                'apple-mobile-web-app-title': 'Decision Matrix',
                'theme-color': '#FEFEFE',
                'msapplication-navbutton-color': '#FEFEFE',
                'apple-mobile-web-app-status-bar-style': 'black-translucent',
                'msapplication-starturl': '/',
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
        }),
        new GenerateSW({
            mode,
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [{
                urlPattern: /\.js$/,
                handler: 'NetworkFirst'
            }]
        }),
        new CopyPlugin({
            patterns: [{
                    from: './public/assets',
                    to: 'assets'
                },
                {
                    from: './public/manifest.json',
                    to: 'manifest.json'
                }
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
};
