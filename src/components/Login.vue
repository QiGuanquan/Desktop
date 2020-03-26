<template>
  <div class="lark-frame" id="larkFrame">
    <vue-element-loading :active="true" duration="6.0">
    <img src="/static/loading.gif" width="100px" height="100px">
    </vue-element-loading>
  </div>
</template>

<script>
import { App } from 'nw.gui'
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
const { manifest } = App
export default {
  name: 'Login',
  data () {
    return {
      loading: true,
      src: manifest.webviewSrc
    }
  },
  created () {
    let getTimestamp = new Date().getTime()
    let webviewIp = this.src + getTimestamp
    var that = this
    axios({
      method: 'get',
      url: webviewIp,
      timeout: 5 * 1000
    }).then(function (resp) {
      console.log('resp', resp)
      if (resp.status === 200) {
        console.log('200')
        that.$router.push({ name: 'LarkPage' })
      } else {
        console.log('resp.status')
        that.$router.push({ name: 'Error' })
        throw new Error('LARK: lark server was not ok .')
      }
    }).catch(resp => {
      console.log('catch')
      that.$router.push({ name: 'Error' })
    })
  },
  components: {
    VueElementLoading
  }
}
</script>

<style scoped>
  .lark-frame {
    width: 100%;
    height: 100%;
  }
</style>
