<template>
  <div class="lark-frame" id="larkFrame">
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
  mounted () {
    this.$store.commit('SET_IS_SHOW_LOADING', true)
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
    background-color: #eeeeee;
  }
</style>
