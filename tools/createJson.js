const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const createTools = require('./createTools');

process.stdin.setEncoding('utf8');
process.stdout.write(chalk.blue('请输入您要创建的json文件名，如queryCreatorInfo\n'));
process.stdin.on('data', async (input)=>{
    input = input.toString().trim();
    //createTools.createPage(input);
    if(input!=""){
        //创建对应组件名
        console.log(chalk.red('当前输入的json文件:'),input);            
        //下面开始创建
        createTools.createJson(input);
        process.exit(0);        
    }else{
        //记录          
        process.stdout.write(chalk.blue('json文件名不能为空，请输入json文件名:\n'));
    }
    //process.exit(0);
})

//createTools.createTree('base'); //更新入口文件index.js里的组件定义