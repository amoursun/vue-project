const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const fs = require('fs');

const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
require('babel-register')(babelrc);

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

console.log('当前运行环境：', isPro ? 'production' : 'development');

var join = function (dir) {
    return path.join(__dirname, dir);
};

var resolve = function (dir) {
    return path.resolve(__dirname, dir);
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
            'process.env': {
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
            'process.env': {
                'NODE_ENV': JSON.stringify(nodeEnv)
            }
        }),
        // webpack 内置的 HMR 插件
        new webpack.HotModuleReplacementPlugin(),

        //每次打包前会将dist文件夹中的文件清除，防止加载不必要的文件
        new CleanWebpackPlugin(['dist']),

        /*
          自动生成html,及文件的引用
          html-webpack-plugin用来打包入口html文件
          entry配置的入口是js文件, webpack以js文件为入口, 遇到import, 用配置的loader加载引入文件
          但作为浏览器打开的入口html, 是引用入口js的文件, 它在整个编译过程的外面,
          所以, 我们需要html-webpack-plugin来打包作为入口的html文件
        */
        // new HtmlWebpackPlugin({
        //     title: 'vue-good'
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        //HashedModuleIdsPlugin，推荐用于生产环境构建：使用这个可以实现缓存，那些没有改变的文件就不会
        //随着每次构建而改变了，节约资源
        new webpack.HashedModuleIdsPlugin()
    )
}

var config = {
    devtool: !isPro && 'cheap-eval-source-map',
    //页面入口文件配置
    // entry: [
    //     "babel-polyfill",
    //     path.resolve(__dirname, 'src/main')
    // ],
    // entry: {
    //     app: ['babel-polyfill', './src/main.js']
    // },
    entry: {
        // main: './src/main.js',
        app: ['babel-polyfill', './src/main.js'],
        vendor: [
            'lodash', 'vue', 'vuex', 'vue-router'
        ]
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: resolve('dist'),
        publicPath: isPro ? './' : '/',
        chunkFilename: '[name].[hash].js'
    },
    plugins: plugins,
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    resolve: {
        modules: [
            resolve('node_modules'),
            join('./src')
        ],
        alias: { // 来确保模块引入变得更简单
            // static: join(__dirname, 'static'),
            // modules: join(__dirname, 'src/modules/'),
            static: resolve('static/'),
            modules: resolve('src/modules/'),
            store: resolve('src/store/'),
            common: resolve('src/node_modules/common/'),
            utils: resolve('src/node_modules/utils/'),
            api: resolve('src/node_modules/api/'),
            basis: resolve('src/node_modules/basis/')
        },
        extensions: ['.js', '.vue', '.less', '.css']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            // exclude: resolve('node_modules/'),
            include: join('/')
        }, {
            test: /\.vue$/,
            use: ['vue-loader'],
            exclude: resolve('node_modules/'),
            include: join('src')
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
        contentBase: join('/'),
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