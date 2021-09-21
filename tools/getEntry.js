const HTMLPlugin = require('html-webpack-plugin');
                const entryMap={"index":"./entry/Index.js","test":"./entry/Test.js",};
    const htmlPlugins = [new HTMLPlugin({
            hash: true,
            filename:"index.html",
            template:'./dev/template.html',
            chunks:['vendors','index'],
            title:"首页"
        }),new HTMLPlugin({
            hash: true,
            filename:"test.html",
            template:'./dev/template.html',
            chunks:['vendors','test'],
            title:"测试"
        }),];
    module.exports = {
        entryMap,
        htmlPlugins
    }