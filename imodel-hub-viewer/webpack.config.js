const path = require('path');
//const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
module.exports = {
    entry: './src/index.ts',
    target: 'web',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: "iModelViewer",
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    resolve: {
        // // fallback:{
        // //     "path": require.resolve("path-browserify"),
        // //     "os": require.resolve("os-browserify/browser"),
        // //     "http": require.resolve("stream-http"),
        // //     "https": require.resolve("https-browserify")
        // // },
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.(ts|tsx)?$/, loader: 'ts-loader' },
            {
                test: /\.css$/i,
                exclude: /\.bentley-icons-generic-webfont.(css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /\.module.(s(a|c)ss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                use: ['svg-inline-loader']
            }, {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'images',
                            outputPath: 'images',
                        }
                    }
                ]
            }
        ]
    },
    //externals: [nodeExternals],
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({ "global.GENTLY": false }),

    ],
    externals:
    {
        "react": "commonjs react",
        "react-dom": "commonjs react-dom",
    },

    optimization: {
        minimize:false
    }
}