# 基于 gulp 的前端工作流

## 介绍

支持以下功能：

- 文件压缩：html、css、js、图片压缩
- 自动添加文件版本号
- 自动路径替换
- less 编译
- es6 编译
- 热加载
- 复制 gulp 不作处理的文件
- 其它...

## 依赖包

### common

1. gulp

  构建工具

1. gulp-concat

  css、js 合并工具

1. gulp-rev

  对文件添加 MD5 后缀

1. gulp-rev-collector

  路径替换

1. del

  删除文件或文件夹

1. run-sequence

  gulp 同步执行

1. browser-sync

  热加载

1. gulp-plumber

  错误处理

1. gulp-changed

  仅传递更改过的文件

### HTML

1. gulp-html-replace

  替换 html 文件内容

1. gulp-htmlmin

  html 压缩工具

### css

1. gulp-less

  less 转换为 css

1. less-plugin-autoprefix

  浏览器前缀

1. gulp-clean-css

  css 压缩工具

### js

1. gulp-babel

  es6 to es5

1. babel-preset-es2015

  preset es2015

1. gulp-uglify

  js 压缩工具

### image

1. gulp-imagemin

  图片压缩工具

## 安装依赖

```bash
npm install --save-dev gulp gulp-concat gulp-rev gulp-rev-collector del run-sequence browser-sync gulp-plumber gulp-changed gulp-html-replace gulp-htmlmin gulp-less less-plugin-autoprefix gulp-clean-css gulp-babel babel-preset-es2015 gulp-uglify gulp-imagemin
```

## 使用

1. 开发：`npm run dev`
1. 构建：`npm run build`