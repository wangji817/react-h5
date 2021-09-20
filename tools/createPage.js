const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const createTools = require('./createTools');

function checkInput(inputData) {
    if (!inputData) {
        return false;
    }
    let inputs = inputData.split(",");
    if (!inputs[0]) {
        return false;
    }
    if (!inputs[1]) {
        return false;
    }
    if (!inputs[2]) {
        return false;
    }
    return { pageName: inputs[0], pagePlugin: inputs[1], subComponent: inputs[2] };
}

process.stdin.setEncoding('utf8');
process.stdout.write(chalk.green('请输入页面中文名(对应html文件的title)、页面组件名、引用子组件名(默认normal)，以英文,分割；如:首页,Index,Home(组件名首字母大写且驼峰写法)\n'));
process.stdin.on('data', async (input) => {
    let inputs = checkInput(input.toString().trim());
    if (inputs) {
        //创建组件
        console.log(`即将创建页面名：${inputs.pageName}，页面组件：${inputs.pagePlugin}，关联的子组件组件：${inputs.subComponent}`);
        const createResult = createTools.createRouter(inputs.pageName, inputs.pagePlugin, inputs.subComponent);
        if (createResult) {
            process.exit(0);
        } else {
            console.log(chalk.red(process));
            process.exit(0);
        }
    } else {
        console.log(`input=======:${checkInput(input)}`);
        process.stdout.write(chalk.green('请重新输入页面中文名(对应html文件的title)、页面组件名、引用子组件名，以英文,分割；如:首页,Index,Home(组件名首字母大写且驼峰写法)\n'));
    }
});
//console.log(createTools.getDirList('page'));
/*
process.stdin.on('data', async (input)=>{
    input = input.toString().trim();
    console.log(chalk.red('输入结果:'),input);
    createTools.createPage(input);
    //createTools.getDirList();
    //process.stdout.write(chalk.blue('请输入关联的组件，可用多个用逗号分隔：\n'));
    //process.exit(!0);
    process.exit(0);
})
*/