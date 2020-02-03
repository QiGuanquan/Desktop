<template>
  <div class="lark-frame">
    <vue-element-loading :active="isLoading" :is-full-screen="true" text="加载中..." spinner="bar-fade-scale" color="#FF6700"/>
    <webview v-show="!isLoading" id="larkPage" src="http://10.11.24.129:8080" autosize="on" style="display:flex; height:100%; width:100%;"
             minwidth="1024" minheight="768" partition="trusted"></webview>
  </div>

</template>

<script>
  import gui from 'nw.gui'
  // import Error from './Error'
  import axios from 'axios' // 引入axios
  import VueElementLoading from 'vue-element-loading'

  export default {
    name: 'LarkPage',
    data () {
      return {
        msg: '',
        isAppActive: true,
        isLoading: true,
        isDebug: false
      }
    },
    created: function () {
    },
    components: {
      VueElementLoading
    },
    mounted () {
      let __this = this
      axios.defaults.timeout = 20000
      axios
      .get('http://10.11.24.129:8080')
      .then(function () {
        __this.isLoading = false
        console.log('网络连接成功')
      })
      .catch(function (res) { // 请求失败处理
        console.log(res)
        console.log('网络连接失败，请检查网关登录')
        window.location.hash = '/error'
      })

      let webview = document.getElementById('larkPage')
      // 启动自定义浏览器
      webview.addEventListener('newwindow', (e) => {
        gui.Window.open('../../static/browsers/browser.html?URL=' + encodeURIComponent(e.targetUrl), {
          id: 'browserWindow',
          position: 'center',
          new_instance: true,
          focus: true,
          width: 1200,
          height: 900,
          min_width: 1024,
          min_height: 768,
          resizable: true,
          title: '云雀浏览器',
          frame: false
        })
      })

      webview.addEventListener('loadstart', function (err) {
        console.log(err)
        __this.isLoading = true
        console.log('开始加载webview')
      })
      webview.addEventListener('loadstop', function (err) {
        console.log(err)
        __this.isLoading = false
        console.log('结束加载webview')
      })
      // gui.Window.get().on('new-win-policy', function (frame, url, policy) {
      //   // 不打开窗口
      //   policy.ignore()
      //   // 在系统默认浏览器打开
      //   gui.Shell.openExternal(url)
      // })

      webview.addEventListener('permissionrequest', function (e) {
        if (e.permission === 'download') {
          e.request.allow()
        }
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
      /* eslint-disable */
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
    },
    methods: {
      /**
       * 设置isAppShow
       * @param {Boolean} value 更新后的值
       */
      setIsAppActive (value) {
        this.isAppActive = value
      },
      /**
       * 生成桌面提醒
       * @param {Object} data {
       *  title: '',
       *  props: {
       *    icon: '',
       *    tag: '',
       *    body: '',
       *    data: {}
       *  }
       * }
       */
      generateNotification (data) {
        // const { data } = event
        if (data && !data.props.icon) {
          data.props.icon = 'file://' + process.cwd() + '/static/logo.png'
        }
        // eslint-disable-next-line
        const notification = new Notification(data.title, data.props)
        notification.onclick = function () {
          notification.close()
          gui.Window.get().show()
        }
      },
      devTools () {
        let webview = document.getElementById('larkPage')
        webview.showDevTools(true)
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
