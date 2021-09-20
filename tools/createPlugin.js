const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const createTools = require('./createTools');

process.stdin.setEncoding('utf8');
process.stdout.write(chalk.blue('请输入您要创建的组件名，如RegUser,Login：\n'));
const inputData = {
    pluginName: "",
    pluginType: "normal"
}
process.stdin.on('data', async (input) => {
    input = input.toString().trim();
    //createTools.createPage(input);
    if (inputData.pluginName != "") {
        //创建对应组件名
        if (/ui|base|normal/.test(input) || input === "") {
            console.log(chalk.red('当前输入的类型:'), input);
            inputData.pluginType = input;
            //下面开始创建
            createTools.createPageOrComponent(inputData.pluginName, '', inputData.pluginType);
            process.exit(0);
        } else {
            process.stdout.write(chalk.blue('输入类型不正确，请输入ui|base|normal：\n'));
        }
    } else {
        //记录组件名
        console.log(chalk.red('当前输入的组件名:'), input);
        inputData.pluginName = input;
        process.stdout.write(chalk.blue('请输入组件类型（ui：ui样式组件；base：基础功能组件；normal：普通业务组件；输入ui或base或normal或回车即可）[默认normal]：\n'));
    }
    //process.exit(0);
})

//createTools.createTree('base'); //更新入口文件index.js里的组件定义