# font-end

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at http://10.3.136.15:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 前言 ##
之前在公司用了Vue + Element组件库做了个后台管理系统，基本很多组件可以直接引用组件库的.

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于vue.js,使用vue-cli脚手架快速生成项目目录，引用Element UI组件库，方便开发快速简洁好看的组件。分离颜色样式，支持手动切换主题色，而且很方便使用自定义主题色。

## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 表格
- [x] 表单
- [x] 支持切换主题色 :sparkles:




## 目录结构介绍 ##
G:\learn3\font-end
├─.babelrc                          //ES6语法编译配置
├─.editorconfig                     //代码编写规格
├─.gitignore
├─.postcssrc.js
├─index.html                        //入口html文件
├─package.json                      //项目及工具的依赖配置文件
├─README.md
├─static                            //静态资源文件存放目录   
|   ├─.gitkeep
|   ├─data.json
|   ├─datasource.json
|   ├─vuetable.json
|   ├─js
|   | └vendor.dll.js
|   ├─img
|   |  └img.jpg
|   ├─css
|   |  ├─color-dark.css             //灰色背景
|   |  ├─datasource.css             //表格样式
|   |  ├─main.css
|   |  ├─theme-green                //浅绿色主题
|   |  |      ├─color-green.css
|   |  |      ├─index.css
|   |  |      ├─fonts
|   |  |      |   ├─element-icons.ttf
|   |  |      |   └element-icons.woff
├─src
|  ├─App.vue                          //页面入口文件
|  ├─main.js                          // 程序入口文件，加载各种公共组件
|  ├─router                           //页面主路由
|  |   └index.js
|  ├─http
|  |  └baseurl.js
|  ├─components                       // 组件
|  |     ├─HelloWorld.vue
|  |     ├─view                         
|  |     |  └edit.vue
|  |     ├─page                       //主要路由页面
|  |     |  ├─Control.vue             //控制台
|  |     |  ├─Home.vue                //主页面
|  |     |  ├─Hotel.vue               //酒店表格
|  |     |  ├─Login.vue               //登陆页面
|  |     |  ├─Menber.vue              //会员管理
|  |     |  └Order.vue                //订单管理
|  |     ├─commom                     // 公共组件
|  |     |   ├─Header.vue             //头部文件
|  |     |   ├─Home.vue               //公共路由入口
|  |     |   └Sidebar.vue             //公共侧边栏
|  ├─assets
|  |   └logo.png
├─config
|   ├─dev.env.js
|   ├─index.js
|   └prod.env.js
├─build
|   ├─build.js
|   ├─check-versions.js
|   ├─logo.png
|   ├─utils.js
|   ├─vue-loader.conf.js
|   ├─webpack.base.conf.js
|   ├─webpack.dev.conf.js
|   └webpack.prod.conf.js





### element-ui ###
一套基于vue.js2.0的桌面组件库。访问地址：[element](http://element.eleme.io/#/zh-CN/component/layout)

### vue-datasource ###
一个用于动态创建表格的vue.js服务端组件。访问地址：[vue-datasource](https://github.com/coderdiaz/vue-datasource)

### 如何切换主题色呢？ ###

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

第三步：打开 src/components/common/Sidebar.vue 文件，找到 el-menu 标签，把 theme="dark" 去掉即可。

## 项目截图 ##
### 默认皮肤 ###

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms1.png)

### 浅绿色皮肤 ###

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms2.png)