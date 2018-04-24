const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './blocks/index.js',

    output: {
        path: path.resolve(__dirname, './'),
        filename: 'app.js'
    },

    devtool: "source-map",
    watch: true,

    module: {
        rules: [
            { // regular css files
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            },
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug/,
                loader: 'pug-loader'
            }
        ]

    },
    plugins: [
        new ExtractTextPlugin("style.css"),
    ]

};