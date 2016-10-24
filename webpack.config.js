var path = require('path');
var webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), // recommanded by webpack
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin() // recommanded by webpack
    ],
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client?127.0.0.1:3000',
         path.resolve(__dirname, 'src/entry')
    ],
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js',
        publicPath: 'http://127.0.01:3000/js'
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { 
                test: /\.js[x]?$/, 
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
}
