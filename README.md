# 小程序模板

> 小程序初始化项目模板

### 功能

集成以下能力: 
1. wx接口promise化 (miniprogram-api-promise)
2. 全局store (redux, redux-logger)
3. connect.Page, connect.Component
4. 增强富文本能力: (mp-html)
5. computed、watch (miniprogram-computed)
6. eventBus支持 (eventemitter3)
7. eslint支持 （airbnb规范）
8. npm script支持 (open, build-npm, open)
9. ramda函数库
10. 以洋葱模型封装了wx.request
11. 自定义tabbar

## 使用

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli).

``` bash
$ vue init @qwertyyb/weapp-template demo  # Create a new project based on this template
$ cd demo               # Navigate into your new project folder
$ npm run open                 # open wechatdevtools
```

## 目录结构
```bash
template
├─.eslintignore # eslint忽略配置
├─.eslintrc.js  # eslint配置
├─app.js
├─app.json
├─app.wxss
├─build.js      # npm run open/preview/npm 脚本文件
├─common.wxss   # 公共样式文件
├─package-lock.json
├─package.json
├─project.config.json  # 小程序项目配置文件
├─sitemap.json
├─utils
|   ├─connect.js  # redux connect文件
|   ├─constant.js # 常量定义文件
|   ├─request.js  # 使用洋葱模型对wx.request封装
|   ├─fetch.js    # 使用封装后的request加入错误处理，token等逻辑
|   └util.js      # 工具库
├─store
|   ├─actions.js
|   ├─index.js
|   ├─middlewares.js
|   └reducers.js
├─service
|    └index.js   # 后端
├─pages
|   ├─logs
|   |  ├─logs.js
|   |  ├─logs.json
|   |  ├─logs.wxml
|   |  └logs.wxss
|   ├─home
|   |  ├─home.js
|   |  ├─home.json
|   |  ├─home.wxml
|   |  └home.wxss
|   ├─auth
|   |  ├─auth.js
|   |  ├─auth.json
|   |  ├─auth.wxml
|   |  └auth.wxss
|   ├─act
|   |  ├─act.js
|   |  ├─act.json
|   |  ├─act.wxml
|   |  └act.wxss
|   ├─account
|   |    ├─account.js
|   |    ├─account.json
|   |    ├─account.wxml
|   |    └account.wxss
├─lib
|  └redux.js  # redux库，直接npm安装的不可用，这里直接放入项目中
├─images      # 图片
|   ├─tabbar
|   |   ├─account-on.png
|   |   ├─account.png
|   |   ├─act.png
|   |   ├─credit.png
|   |   ├─home-on.png
|   |   ├─home.png
|   |   └live.png
├─custom-tab-bar  # 自定义tabbar
|       ├─index.js
|       ├─index.json
|       ├─index.wxml
|       └index.wxss
├─components  # 公用组件
|     ├─badge
|     |   ├─badge.js
|     |   ├─badge.json
|     |   ├─badge.wxml
|     |   └badge.wxss
├─behaviors  # 组件behaviors
|     ├─developing.js # 弹出正在开发中的弹窗
|     └setTabBar.js   # 设置自定义弹窗当前激活的tab
```