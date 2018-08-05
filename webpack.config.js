// expose an object to another file
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');
    
    return {
        entry: './src/app.js',
        output: {
        path: path.join(__dirname, 'public', 'dist'),
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
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
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
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
};
