/* eslint-disable */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const dev = process.env.NODE_ENV === "dev"

let styleLoaders = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: process.env.NODE_ENV === 'development',
        },
    },
    'css-loader'
]

let plugins = [
    new MiniCssExtractPlugin({
        filename: "colorjs.bundle.css"
    })
]
if (!dev) plugins.push(new CleanWebpackPlugin())

let config = {
    entry: {
        colorjs: ['./assets/scss/colorjs.scss', './assets/js/colorjs.js']
    },
    resolve: {
        alias: {
            '@': path.resolve('./assets/js/'),
            '@css': path.resolve('./assets/css/'),
            '@scss': path.resolve('./assets/scss/'),
            '@img': path.resolve('./assets/img/')
        }
    },
    watch: dev,
    mode: dev ? 'development' : 'production',
    plugins: plugins,
    devtool: dev ? "cheap-module-eval-source-map" : "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['eslint-loader']
            },
            {
                test: /\.css$/,
                use: styleLoaders
            },
        {
        test: /\.scss$/,
            use: [...styleLoaders, 'sass-loader']
    },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.* )?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(wav|mpe?g?[234]|webm|ogg|ogv)(\?.* )?$/,
                loader: 'file-loader',
                options: {
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(png|gif|jpg|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[hash:7].[ext]'
                        },
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: !dev
                        }
                    }
                ],
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: '[name].bundle.js'
    }

};

module.exports = config
