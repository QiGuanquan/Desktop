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
      url: webviewIp
    }).then(function (resp) {
      if (resp.status === 200) {
        that.$router.push({ name: 'LarkPage' })
      } else {
        that.$router.push({ name: 'Error' })
        throw new Error('LARK: lark server was not ok .')
      }
    }).catch(resp => {
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
