//const baseConfig = require('../../webpack.config')

const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';

const webpackConfig = () => {
    return {
        entry: {
            app: ['./src/client/src/app/index.tsx'],
            vendor: ['react', 'react-dom']
        },
        output: {
            path: path.resolve(__dirname, 'dist','app', 'server', 'client'),
            filename: 'js/[name].js'
        },
        devtool: 'source-map',
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 3000,
            open: true,
            hot: true,
            inline: true,
            historyApiFallback: true,
            stats: "errors-only",
            proxy: {
                "/api": {
                    target: "http://localhost:34001",
                }
            }
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
        },
        module: {
            rules: [
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                { test: /\.(ts|tsx)?$/, loader: 'ts-loader' },
                {
                    test: /\.css$/i,
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
                },
                { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'client', 'index.html')
                , excludeChunks: ['server']
            }),
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                "global.GENTLY": false,
                NODE_ENV: JSON.stringify(PROD ? 'production' : 'development'),
            })
        ],
        node: {
            fs: 'empty'
        },
        optimization: {
            minimize: false
        },
        externals: {
            electron: "require('electron')"
        },
    };
};

module.exports = webpackConfig;
