const path = require('path')

const entryConfig = require('./tools/getEntry');

const webpack = require('webpack')

const isDev = process.env.NODE_ENV == 'development';

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    target: 'web',
    mode: "development",
    entry: entryConfig.entryMap || {},
    output: {
        path: __dirname + '/dev/',
        publicPath: "",
        filename: './[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //loader:  'style-loader!css-loader'
                //loader: cssExtract.extract( 'css-loader' ),
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                //loader:   'style-loader!css-loader!sass-loader?sourceMap'
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
                //use: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.(jpg|jpeg|png|svg|gif)$/i,
                loader: 'url-loader?limit=4096&name=[path][name]' + '.[ext]' // name=后面，是生成后的图片文件的 路径+名字
            }, {
                test: /\.js?$/,
                // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
                // test 和 include 具有相同的作用，都是必须匹配选项
                // exclude 是必不匹配选项（优先于 test 和 include）
                // 最佳实践：
                // - 只在 test 和 文件名匹配 中使用正则表达式
                // - 在 include 和 exclude 中使用绝对路径数组
                // - 尽量避免 exclude，更倾向于使用 include
                // issuer 条件（导入源）
                // 标识应用这些规则，即使规则覆盖（高级选项）

                loader: "babel-loader",
                // 应该应用的 loader，它相对上下文解析
                // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
                // 查看 webpack 1 升级指南。

                options: {
                    "presets": ["react", "es2015", "stage-0"],
                    "compact": true,
                    "plugins": [
                        [
                            "transform-runtime",
                            {
                                "helpers": false,
                                "polyfill": false,
                                "regenerator": true,
                                "moduleName": "babel-runtime"
                            }
                        ],
                        [
                            "import",
                            {
                                "libraryName": "antd-mobile",
                                "libraryDirectory": "es",
                                "style": "css"
                            }
                        ],
                    ]
                }

                // loader 的可选项
            }
        ]
    },
    watch: true,
    resolve: {
        extensions: ['.js', '.scss'],
        alias: { // 路径配置
            'plugin': __dirname + "/src/components",
            '@baseCom': __dirname + "/src/components/base_components",
            '@normalCom': __dirname + "/src/components/normal_components",
            '@uiCom': __dirname + "/src/components/ui_components",
            '@util': __dirname + "/src/util/",
            '@base': __dirname + "/src/base/",
            '@api': __dirname + "/src/api/"
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new ExtractTextPlugin("./assets/[name].min.css"),
        // make sure to include the plugin for the magic
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"',
            }
        })].concat(entryConfig.htmlPlugins),
};
if (isDev) {
    console.log('is dev');
    config.devtool = '#cheap-module-eval-source-map',
        config.devServer = {
            port: 8000,
            host: '0.0.0.0',
            useLocalIp: true,
            overlay: {
                errors: true
            },
            open: true,  //每次都打开一个网页
            hot: true //只渲染一个组件
        }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    )
}

module.exports = config