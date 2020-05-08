<template>
  <section class="body-container">
    <section class="update-container" v-if="!info && !jsonIsLoading">
      <h2>The programmer peter is crazy overtime</h2>
      <p>No update</p>
    </section>
    <section class="update-container" v-if="info">
      <vue-element-loading :active="getLoad" spinner="bar-fade-scale" color="#FF6700"/>
      <p><img src="/static/download.png" width="160" height="160"></p>
      <p><span style="font-size: 32px" class="font-style">云雀新版本已发布</span></p>
      <p><span class="font-style-second">当前版本号: {{appinfo.manifest.version}}</span></p>
      <p><span class="font-style-second">最新版本号: {{info.version}}</span></p>
      <!-- <p><span class="font-style" style="font-size: 16px; color: #e60c0c">注意：选择的文件下载路径不能包含中文或者特殊符号</span></p> -->
      <button type="button" class="important-button" @click="startUpdata">自动更新</button>
      <button type="button" class="important-button" @click="clearUpdata">暂不更新</button>
      <button type="button" class="important-button" v-if="progress < 100" :disabled="progress >= 0 || !saveAsName" @click="showFileDialog">手动更新</button>
      <input type="file" class="hidden" ref="fileInput" :nwsaveas="saveAsName" @change="startDownload">
      <!-- <p><a href="http://10.11.24.129:8888/larkhome/downloadPage.html">去官网下载最新版安装包</a></p> -->
    </section>
    <div style="text-align: center">
      <p v-if="progress >= 400">更新错误： {{progress}} </p>
      <p v-if="progress < 400">更新状态: {{msg}} </p>
    </div>
  </section>
</template>

<script>
  import { getUpdateJson, parseName, downloadHandle } from '@/utils/update'
  import { Shell } from 'nw.gui'
  import VueElementLoading from 'vue-element-loading'
  let gui = require('nw.gui')
  let updater = require('node-webkit-updater')
  /* eslint-disable */
  let upd = new updater(gui.App.manifest)
  /* eslint-enable */

  export default {
    name: 'update',
    data () {
      return {
        info: null,
        appinfo: null,
        jsonIsLoading: true,
        progress: -1,  // init: -1, error: -2~-5
        msg: '等待更新',
        loading: true
      }
    },
    components: {
      VueElementLoading
      // Collapse
    },
    computed: {
      saveAsName () {
        return parseName(this.info)
      },
      getLoad () {
        return !this.loading
      }
    },
    methods: {
      startUpdata () {
        this.msg = '正在更新，请不要关闭软件'
        this.loading = false
        // 从manifest目录校验版本
        upd.checkNewVersion(function (error, newVersionExists, manifest) {
          if (error) {
            // 版本检查出现问题
            this.progress = 400
          }
          if (!error && newVersionExists) {
            // 下载新版本
            upd.download(function (error, filename) {
              if (error) {
                // 更新文件下载出现问题
                this.progress = 401
              }
              if (!error) {
                // 下载完成关闭应用
                upd.unpack(filename, function (error, newAppPath) {
                  if (error) {
                    // 更新软件出现问题
                    this.progress = 402
                  }
                  if (!error) {
                    // 重启应用
                    upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec(), filename], {})
                    gui.App.quit()
                  }
                }, manifest)
              }
            }, manifest)
          }
        })
      },
      openDownloadPage () {
        window.open('http://10.11.24.129:8888/larkhome/downloadPage.html')
      },
      clearUpdata () {
        window.location.hash = '/'
      },
      showFileDialog (ev) {
        this.$refs.fileInput.click()
      },
      startDownload (ev) {
        const targetPath = ev.target.value

        // reset
        ev.target.value = ''
        if (!targetPath.trim()) return

        this.progress = 0
        const file = downloadHandle(targetPath, this.info)

        file.on('data', num => { this.progress = Math.ceil(num * 100) })
        file.on('error', () => { this.progress = -2 })

        file.on('end', filePath => {
          this.progress = this.progress < 0 ? this.progress : 100

          // open install file
          setTimeout(() => Shell.openExternal(filePath), 100)
        })
      }
    },
    created () {
      // gui.Window.get().showDevTools()
      getUpdateJson().catch(err => { console.log(err) }).then(json => {
        this.jsonIsLoading = false
        this.info = json
      })
      this.appinfo = gui.App
    }
  }

</script>
<style scoped>
  .hidden {
    display: none;
  }
  .body-container{
    height: 100%;
    background-color: #eeeeee;
    padding-top: 60px
  }
  .update-btn {
    margin-bottom: 3em;
    padding: 8px 15px;
    outline: none;
    border: 1px solid #2196F3;
    background: transparent;
    cursor: pointer;
    opacity: .5;
    transition: opacity .5s;
  }

  .update-btn:hover {
    opacity: 1;
  }
  h1{
    color: red;
  }
  .download-progress {
    margin-bottom: 3em;
  }
  .update-container{
    text-align: center; /*让div内部文字居中*/
    background-color: #fff;
    border-radius: 8px;
    width: 450px;
    height: 450px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 32px;
  }
  .font-style {
    font-family: SimHei;
  }
  .font-style-second{
    color: #6a696f;
  }
  .important-button{
    background-color: #4CAF50;
    color: white;
    padding: 15px 32px;
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 4px;
    cursor:pointer;
  }

  .important-button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
</style>
