const HTMLPlugin = require('html-webpack-plugin');
                const entryMap={"index":"./entry/Index.js",};
    const htmlPlugins = [new HTMLPlugin({
            hash: true,
            filename:"index.html",
            template:'./dev/template.html',
            chunks:['vendors','index'],
            title:"首页"
        }),];
    module.exports = {
        entryMap,
        htmlPlugins
    }