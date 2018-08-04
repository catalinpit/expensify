// expose an object to another file
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            // run all files ending in '.js'
            test: /\.js$/,
            // ignore node_modules
            exclude: /node_modules/
        }, {
            // look for all the files ending in scss
            // but the first 's' is optional
            // it will take both css and scss files
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};