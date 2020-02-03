## 软件更新错误码
* 400 版本检查出现问题
* 401 更新文件下载出现问题
* 402 更新软件出现问题

## 打包后软件可使用devtools调试
* 修改config目录下index.js

      builder: {
        files: [resolve('./dist/**')],
        // platforms: ['win32', 'win64', 'osx64'],
        platforms: ['win32', 'win64'],
        version: '0.14.7',
        flavor: 'normal',//将此处更改为sdk即可
        cacheDir: resolve('./node_modules/_nw-builder-cache/'),
        buildDir: resolve('./releases'),
        winIco: resolve('./build/setup_resources/exe.ico'),
        macIcns: resolve('./build/setup_resources/logo.icns'),
        buildType: function () {
          return this.appVersion
        }
      },


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# only build nw
npm run build --onlyNW

# default is build `setup.exe` in windows
npm run build --noSetup
```

## FAQ
### Why nw@0.14.7 ？
Not all of NW.js support `XP`, because from the beginning of `Chromium50` does not support the XP, so if your client want to support XP, the best of version is `0.14.7`. See NW.js's blog: [NW.js v0.14.7 (LTS) Released](https://nwjs.io/blog/v0.14.7/)
test1431

### 前端项目地址未更改，更改后才能运行