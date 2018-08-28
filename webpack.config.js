const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fs = require('fs');

const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
require('babel-register')(babelrc);

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

console.log('当前运行环境：', isPro ? 'production' : 'development');

var resolve = function (dir) {
    return path.join(__dirname, dir);
};

var plugins = [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './public/index.html'
    })
];
if (isPro) {
    plugins.push(
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(nodeEnv)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
} else {
    plugins.push(
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(nodeEnv)
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    )
}

var config = {
    devtool: !isPro && 'cheap-eval-source-map',
    //页面入口文件配置
    // entry: [
    //     "babel-polyfill",
    //     path.resolve(__dirname, 'src/main')
    // ],
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: isPro ? './' : '/',
        chunkFilename: '[name].[hash].js'
    },
    plugins: plugins,
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            'static': path.join(__dirname, 'static'),
            'components': path.join(__dirname, 'src/components'),
            'modules': path.join(__dirname, 'src/modules')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            include: resolve('/')
        },{
            test: /\.vue$/,
            use: ['vue-loader'],
            exclude: /node_modules/,
            include: resolve('src')
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: ['url-loader?limit=1024&name=files/[name].[hash:7].[ext]']
        }, {
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader'],
                fallback: 'style-loader'
            })
        }]
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,//防止重复保存频繁重新编译,300ms内重复保存不打包
        poll: 1000  //每秒询问的文件变更的次数
    },
    devServer: {
        contentBase: resolve('/'),
        historyApiFallback: true,
        compress: true,
        port: 6699,
        hot: true,
        inline: true,
        stats: {
            assets: true,
            children: false,
            modules: false,
            chunks: false,
            publicPath: false,
            timings: true,
            warnings: true,
            colors: {
                green: '\u001b[32m'
            }
        },
    }
};

module.exports = config;