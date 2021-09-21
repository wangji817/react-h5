const fs = require('fs');
const path = require('path');
const async = require('async');
const chalk = require('chalk');
const fileTools = {
    readDirSync: function (path) {
        let list = [];
        try {
            var pa = fs.readdirSync(path);
            pa.forEach((ele, index) => {
                var info = fs.statSync(path + "/" + ele)
                if (info.isDirectory() && /\./.test(ele) === false) {
                    //console.log("dir: "+ele)
                    list.push(ele);
                } else {
                    //不是目录，跳过
                }
            })
        } catch (e) {
            console.log("获取目录出错", e.message);
        }
        return list
    },
    //获取entry目录下的文件
    getDirFiles: function (path) {
        let list = [];
        let listName = {}
        try {
            var pa = fs.readdirSync(path);
            pa.forEach((ele, index) => {
                var info = fs.statSync(path + "/" + ele)
                if (info.isDirectory() && /\./.test(ele) === false) {
                    console.log("dir: " + ele) //是目录
                } else {
                    if (/__/.test(ele) === true) {
                        listName[ele.split("__")[0]] = ele.split("__")[1];
                    } else if (/.js/.test(ele) === true) {
                        list.push(ele);
                    }
                    //不是目录，跳过                   
                }
            })
        } catch (e) {
            console.log("获取目录出错", e.message);
        }
        return { list, listName }
    },
    /**
     *生成多层目录
     * @param dir 多层目录
     * @param split 分隔符，ex:'/' 对应的目录地址:'2015/10/10'
     * @param mode 目录权限（读写权限），默认0777
     * @param callback
     */
    createDirsSync: function (dir, split, mode, callback) {
        try {
            console.log("创建目录：" + dir);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
                callback && callback();
            } else {
                console.log(`${dir}目录已存在`);
            }
        } catch (e) {
            console.log(e.message);
        }
    }
}
//创建页面或者组件
//type 类型  page为页面  其他为组件包含 ui|base|normal
const createPageOrComponent = (pagePlugin, subComponent, type = 'normal') => {
    type = type || "normal";
    console.log('类型：', type);
    if (!!pagePlugin) {
        let targetPath, modPath;
        if (type == "page") {
            targetPath = path.join(__dirname, "../src/page");
            modPath = path.join(__dirname, "/model/pageMod");
        } else {
            targetPath = path.join(__dirname, `../src/components/${type}_components`);
            modPath = path.join(__dirname, "/model/pluginMod");
        }
        // console.log(`modPath:${modPath},targetPath:${targetPath},modPath:${modPath}`);
        const cssPath = `${modPath}/index.scss`;
        const jsPath = `${modPath}/index.js`;
        let cssStr = fs.readFileSync(cssPath, 'utf-8');
        let jsStr = fs.readFileSync(jsPath, 'utf-8');
        const pagePath = `${targetPath}/${pagePlugin}`;
        const targetCssPath = `${pagePath}/index.scss`;
        const targetJsPath = `${pagePath}/index.js`;
        cssStr = cssStr.replace(/XXXXXX/g, pagePlugin);
        jsStr = jsStr.replace(/XXXXXX/g, pagePlugin);
        type === "page" && (jsStr = jsStr.replace(/YourPlugin/g, subComponent));
        // console.log('====1:',targetJsPath, targetCssPath);
        // console.log('====2:',cssStr, jsStr);
        try {
            fileTools.createDirsSync(pagePath, "", "", () => {
                fs.writeFileSync(targetJsPath, jsStr, 'utf-8');
                fs.writeFileSync(targetCssPath, cssStr, 'utf-8');
            });
            createTree(type);
        } catch (e) {
            console.log(e.message);
        }
        return true;
    } else {
        console.log('页面名或者组件名不能为空');
        return false;
    }

}

//获取组件目录的列表 
//type:  ui：ui样式组件/base：基础功能组件/normal：普通业务组件 page:页面
const getDirList = (type = "ui") => {
    if (type == "page") {
        return fileTools.readDirSync(path.join(__dirname, `../src/page`));
    }
    return fileTools.readDirSync(path.join(__dirname, `../src/components/${type}_components`));
}

//创建页面或者组件入口文件 index.js
//type:  ui：ui样式组件/base：基础功能组件/normal：普通业务组件 page:页面
function createTree(type = "") {
    const itemList = getDirList(type);
    let targetPath = "";
    if (type == "page") {
        targetPath = path.join(__dirname, `../src/page/index.js`);
    } else {
        targetPath = path.join(__dirname, `../src/components/${type}_components/index.js`);
    }
    console.log(itemList);
    let middle = "";
    if (itemList.length > 0) {
        itemList.forEach((item, index) => {
            middle += `get ${item}() {
        return require('./${item}').default;
    },
    `
        });
    }
    const mod = `module.exports = {
    ${middle}
}`;
    fs.writeFileSync(targetPath, mod, 'utf-8');
}
//更新entry文件

const updateEntry = () => {
    const epath = path.join(__dirname, `../tools/getEntry.js`);
    const { list, listName } = fileTools.getDirFiles(path.join(__dirname, `../entry/`));
    console.log('当前入口文件', list)
    console.log('当前页面列表', listName)
    let str = `const HTMLPlugin = require('html-webpack-plugin');
                const entryMap={`;
    let pluginStr = 'const htmlPlugins = [';
    list && list.forEach((item) => {
        const fileName = item.split('.')[0] || "";
        const LowerFileName = fileName.toLocaleLowerCase();
        const getPageName = listName[fileName];
        str += `"${LowerFileName}":"./entry/${item}",`;
        pluginStr += `new HTMLPlugin({
            hash: true,
            filename:"${LowerFileName}.html",
            template:'./dev/template.html',
            chunks:['vendors','${LowerFileName}'],
            title:"${getPageName}"
        }),`
    });
    pluginStr += `];
    module.exports = {
        entryMap,
        htmlPlugins
    }`;
    str += `};
    ${pluginStr}`;
    fs.writeFileSync(epath, str, 'utf-8');
    //自动生成页面入口文件
    let pageStr = 'export default [';
    list && list.forEach((item) => {
        const fileName = item.split('.')[0] || "";
        const LowerFileName = fileName.toLocaleLowerCase();
        const getPageName = listName[fileName];
        pageStr += `{
    path:"./${LowerFileName}.html",
    title:"${getPageName}"
},`
    });
    pageStr += `];`;
    const listpath = path.join(__dirname, `../config/pageList.js`);
    fs.writeFileSync(listpath, pageStr, 'utf-8');
}
//写入路由文件
const createRouter = (pageName, pagePlugin, subComponent) => {
    const entryJsPath = path.join(__dirname, `../entry/${pagePlugin}.js`);
    const entryJsTxt = path.join(__dirname, `../entry/${pagePlugin}__${pageName}`);
    const entryStr = `import React from 'react';
    import ReactDOM from 'react-dom';
    import ${pagePlugin} from '../src/page/${pagePlugin}/';
    ReactDOM.render(<${pagePlugin} />, document.querySelector('#wrapper'));`;
    console.log(entryJsPath, entryJsTxt, entryStr);
    fs.writeFileSync(entryJsPath, entryStr, 'utf-8');
    fs.writeFileSync(entryJsTxt, entryStr, 'utf-8');
    createPageOrComponent(pagePlugin, subComponent, "page");//创建页面组件
    updateEntry();//更新入口文件
    console.log(chalk.green('生成路由和页面成功'));
    return true;
}


//创建本地json文件路径
const createJson = (pageName) => {
    console.log('本地json文件：', pageName);
    if (!!pageName) {
        let targetPath;
        targetPath = path.join(__dirname, "../static/json");
        const jsonPath = `${targetPath}/${pageName}.json`;
        const modPath = path.join(__dirname, "/model/jsonMod");
        let jsonStr = fs.readFileSync(`${modPath}/index.json`, 'utf-8');
        console.log(jsonPath, jsonStr);
        try {
            fs.writeFileSync(jsonPath, jsonStr, "utf-8");
        } catch (e) {
            console.log(e.message);
        }
        return true;
    } else {
        console.log('json名不能为空');
        return false;
    }

}

module.exports = {
    createPageOrComponent,
    createJson,
    fileTools,
    getDirList,
    createTree,
    createRouter,
    updateEntry
}