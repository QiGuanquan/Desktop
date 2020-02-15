<template>
  <div class="lark-frame" id="larkFrame">
    <vue-element-loading :active="isShow" spinner="spinner" color="#FF6700" size="64"/>
        <webview :v-show="!isShow" id="larkPage" src="http://127.0.0.1:8081" autosize="on" style="display:flex; height:100%; width:100%;"
             minwidth="1024" minheight="768" partition="trusted"></webview>
  </div>
</template>

<script>
import {createBrowser} from '@/utils/browser'
import {createNotification} from '@/utils/notification'
import {handleRequest} from '@/utils/permissionrequest'
import { checkNetWork } from '@/utils/network.js'
import VueElementLoading from 'vue-element-loading'

export default {
  name: 'LarkPage',
  data () {
    return {
      msg: '',
      isAppActive: true,
      isLoading: true,
      isDebug: false,
      mainWebView: {},
      isShow: true
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
  },
  methods: {
  }
}
</script>
<style scoped>
  .lark-frame {
    width: 100%;
    height: 100%;
  }
</style>
