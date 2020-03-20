<template>
  <div class="lark-frame" id="larkFrame">
    <vue-element-loading :active="isShow" spinner="spinner" color="#FF6700" size="64"/>
        <webview :v-show="!isShow" id="larkPage" :src="src" autosize="on" style="display:flex; height:100%; width:100%;"
             minwidth="1024" minheight="768" partition="trusted"></webview>
  </div>
</template>

<script>
import { App } from 'nw.gui'
import {createBrowser} from '@/utils/browser'
import {createNotification} from '@/utils/notification'
import {handleRequest} from '@/utils/permissionrequest'
import { checkNetWork } from '@/utils/network.js'
import VueElementLoading from 'vue-element-loading'
const { manifest } = App

export default {
  name: 'LarkPage',
  data () {
    return {
      msg: '',
      isAppActive: true,
      isLoading: true,
      isDebug: false,
      mainWebView: {},
      isShow: true,
      src: manifest.webviewSrc
    }
  },
  created () {
    return checkNetWork().then(status => {
      if (status) {
        this.isShow = false
      }
    })
  },
  components: {
    VueElementLoading
  },
  mounted () {
    let webview = document.getElementById('larkPage')
    // webview.addEventListener('loadstart', function () {
    //   this.isShow = false
    // })
    // webview.addEventListener('loadstop', function () {
    //   this.isShow = false
    // })
    webview.addEventListener('newwindow', function (e) {
      createBrowser(e)
    })
    webview.addEventListener('consolemessage', function (e) {
      createNotification(e)
    })
    webview.addEventListener('permissionrequest', function (e) {
      handleRequest(e)
    })
    webview.addEventListener('drop', function (e) {
      const data = { type: 'dropfile',
        data: e.dataTransfer.files
      }
      webview.contentWindow.postMessage(data, '*')
    })

      /* eslint-disable no-undef */
    chrome.downloads.onChanged.addListener(({id, state = {}, error}) => {
      console.log(id, state)
      if (state.current === chrome.downloads.State.COMPLETE) {
          /* eslint-disable no-undef */
        chrome.downloads.show(id)
      }
    })
    // // 监听webview中的console消息
    window.addEventListener('consolemessage', function (event) {
        // eslint-disable-next-line
        if (isAppActive) return
        /* eslint-disable no-undef */
      if (!isFocusMode) {
        let message = {}
        try {
          message = JSON.parse(event.message)
        } catch (error) {
          return
        }
        if (message.code && message.code === 4700) {
          gui.Window.get().requestAttention(1)
          const data = message.data
          if (data && !data.props.icon) {
            data.props.icon = 'file://' + process.cwd() + '/static/logo.png'
          }
            // eslint1-disable-next-line
          const notification = new Notification(data.title, data.props)
          notification.onclick = function () {
            notification.close()
            gui.Window.get().show()
          }
        }
      }
        // 设置闪烁
        // 窗口在托盘中且未闪烁
        /* eslint-disable no-undef */
      if (!isShowWindow && !flashTimer) {
          /* eslint-disable no-undef */
        startIconFlash()
      }
    }, false)
      // 监听软件更新
    let gui = require('nw.gui')
      // let pkg = require('./package.json')
    let updater = require('node-webkit-updater')
      /* eslint-disable */
      let upd = new updater(gui.App.manifest)
      /* eslint-enable */
    let copyPath, execPath, zipPath, openDev
    if (gui.App.argv.length) {
      copyPath = gui.App.argv[0]
      execPath = gui.App.argv[1]
      zipPath = gui.App.argv[2]
      openDev = gui.App.argv[3]
      if (openDev === 'debug') {
        __this.isDebug = true
      }
        // 替换旧版本
      upd.install(copyPath, zipPath, function (err) {
        if (!err) {
              // 重启
          upd.run(execPath, null)
          gui.App.quit()
        }
      })
    } else {
  //      alert('更新失败，请联系管理员，65548')
    }
  }
}
</script>
<style scoped>
  .lark-frame {
    width: 100%;
    height: 100%;
  }
</style>
