const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: './src/server/index.ts',
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, path.join('dist','app', 'server'))
    }, optimization: {
        minimize: false
    }, node: {
        __dirname: false,
    }, resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', '.node']
    }, module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.(ts|tsx)?$/, loader: 'ts-loader' },
            { test: /\.(node)?$/, loader: 'node-loader' }
        ]
    }, externals: [
        (function () {
            const IGNORES = [
                'electron'
            ];
            return function (context, request, callback) {
                if (IGNORES.indexOf(request) >= 0) {
                    return callback(null, "require('" + request + "')");
                }
                return callback();
            };
        })()
    ], plugins: [
        new Dotenv(),
        new webpack.DefinePlugin({ "global.GENTLY": false }),
    ]
}