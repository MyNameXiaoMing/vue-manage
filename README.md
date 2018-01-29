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
我们这次用Vue + Element组件库做了个后台管理系统，基本很多组件可以直接引用组件库的.

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于vue.js,使用vue-cli脚手架快速生成项目目录，引用Element UI组件库，方便开发快速简洁好看的组件。分离颜色样式，支持手动切换主题色，而且很方便使用自定义主题色。

## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 表格
- [x] 表单
- [x] 支持切换主题色 :sparkles:




## 目录结构介绍 ##
    G:\vue-manage-master
  │  .babelrc
  │  .editorconfig
  │  .gitignore
  │  .postcssrc.js
  │  db_hotel.sql                                        //该文件是数据库 需要导入到mysql使用
  │  index.html
  │  package.json
  │  README.md
  │
  ├─api                                                  //后台接口
  │  └─vueprojectapi
  │      │  .gitignore
  │      │  package-lock.json
  │      │  package.json
  │      │  server.js                                    //运行接口文件,在控制台输入 node server 
  │      │
  │      ├─db
  │      │      db.js                                    //连接数据库文件
  │      │
  │      └─router                                        //路由文件夹
  │              account.js
  │              detail.js
  │              hotel.js
  │              index.js
  │              login.js
  │              order.js
  │              rooms.js
  │              user.js
  │
  ├─build                                                //脚手架构建文件夹
  │      build.js
  │      check-versions.js
  │      logo.png
  │      utils.js
  │      vue-loader.conf.js
  │      webpack.base.conf.js
  │      webpack.dev.conf.js
  │      webpack.prod.conf.js
  │
  ├─config
  │      dev.env.js
  │      index.js
  │      prod.env.js
  │
  ├─dist
  │  │  index.html                                        //build好的静态资源文件，可以直接打开
  │  │
  │  └─static
  │      │  data.json
  │      │  datasource.json
  │      │
  │      ├─css
  │      │  │  app.1d71396b541d38fccaa4c2c8f5428af2.css
  │      │  │  app.1d71396b541d38fccaa4c2c8f5428af2.css.map
  │      │  │  color-dark.css
  │      │  │  datasource.css
  │      │  │  main.css
  │      │  │
  │      │  └─theme-green
  │      │      │  color-green.css
  │      │      │  index.css
  │      │      │
  │      │      └─fonts
  │      │              element-icons.ttf
  │      │              element-icons.woff
  │      │
  │      ├─fonts
  │      │      element-icons.b02bdc1.ttf
  │      │
  │      ├─img
  │      │      img.2aab7b4.jpg
  │      │      img.jpg
  │      │
  │      └─js
  │              app.2da0bc2612c07fa3dd95.js
  │              app.2da0bc2612c07fa3dd95.js.map
  │              manifest.463495671c2583775c3f.js
  │              manifest.463495671c2583775c3f.js.map
  │              vendor.81d99c70e5a1f7484553.js
  │              vendor.81d99c70e5a1f7484553.js.map
  │              vendor.dll.js
  │
  ├─src                                                     //项目代码文件
  │  │  App.vue                                             //组件集合入口
  │  │  main.js                                             //项目入口
  │  │
  │  ├─assets
  │  │      logo.png
  │  │
  │  ├─components                                           //组件
  │  │  │  HelloWorld.vue
  │  │  │
  │  │  ├─commom                                             //公用组件
  │  │  │      Header.vue                                    //头部组件
  │  │  │      Home.vue                                      //主页入口文件
  │  │  │      Sidebar.vue                                   //侧边栏组件
  │  │  │
  │  │  ├─page                                               //普通页面组件
  │  │  │      Control.vue
  │  │  │      Home.vue
  │  │  │      Hotel.vue                                     //酒店管理组件
  │  │  │      Login.vue                                     //登陆组件
  │  │  │      Menber.vue                                    //会员管理组件
  │  │  │      Order.vue                                     //订单管理组件
  │  │  │
  │  │  └─view
  │  │          edit.vue
  │  │
  │  ├─http                                                   //放置baseurl的文件夹，可在这里改ip
  │  │      baseurl.js
  │  │
  │  └─router                                                 //主路由文件夹
  │          index.js
  │
  └─static                                                    //引入静态资源文件夹
      │  .gitkeep
      │  data.json
      │  datasource.json
      │
      ├─css
      │  │  color-dark.css
      │  │  datasource.css
      │  │  main.css
      │  │
      │  └─theme-green
      │      │  color-green.css
      │      │  index.css
      │      │
      │      └─fonts
      │              element-icons.ttf
      │              element-icons.woff
      │
      ├─img
      │      img.jpg
      │
      └─js
              vendor.dll.js




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
