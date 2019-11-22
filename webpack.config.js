const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    }
};