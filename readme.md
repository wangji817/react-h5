## 1、环境要求

nodejs > 14.16.0

npm或cnpm或yarn

## 2、安装构建

```
yarn
node-sass报错则需自己再次安装试试 npm install node-sass@4.13.1
```

### 启动本地调试

```
npm run dev
```

调试页面：http://localhost:8000

### 创建组件

```
npm run add:plugin
```

后根据提示操作，注意组件名首字母要大写


### 创建页面(一次性关联页面title，页面组件，子组件)

```
npm run add:page
```

后根据提示操作


### 打包发布

```
npm run build
```

### 手动更新页面列表

```
npm run updateEntry
```

## 3、相关规范说明

### 目录结构说明

```
|--|src
|----|apis 所有请求放置之处，方便管理
|----|base (可用于存放基础样式和基础scss)
|----|components (组件存放目录，包含ui：基础ui组件、base：基础功能组件、normal:普通业务组件)
|--------|base_components (基础功能组件目录)
|--------|normal_components (基础业务组件目录)
|--------|ui_components (基础UI组件目录)
|--|config (配置文件) 
|--------|pageList.js (页面路由配置文件，npm run add:page时会自动更新)
|----|pages （每个路由path下的入口组件） 
|----|util (公共方法util工具类库)
```

全局webpack入口文件位于 tools/getEntry.js 由nodejs复写生成。请谨慎修改，修改后需要执行:

```
npm run updateEntry
```

### rem说明


### 开发流程

1. npm install 安装相关依赖
2. git checkout 新分支开发
3. npm run add:plugin 添加组件，注意组件名要大写
4. npm run add:page 添加页面，注意页面关联的组件名也要大写
5. npm run dev 启动本地调试开发
6. git merge trunk或master分支到对应环境

### 相关组件和模块

* antd和antd-mobile相关组件

本脚手架支持antd或antd-mobile，可直接引入使用

```
import { Button, Toast } from 'antd';
```
封装了axios请求模块

### Util工具类方法说明

需要先引入import { vtools } from '@util';

* ajax(get)

```
vtools.get("/json/testquery.json",{}).then((result)=>{console.log(result)});
```

* ajax(post)

```
vtools.post("/json/testquery.json",{}).then((result)=>{console.log(result)});
```

* 序列化(paramSerialize)

```
vtools.paramSerialize({key:"123",name:"john"})
```

* 空值判断(isEmpty)

```
vtools.isEmpty(Val)
```

* 获取url参数(getQueryString)

```
vtools.getQueryString('id')
```

更多请自行查阅 /src/util/index.js