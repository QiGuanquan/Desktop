<template>
  <div class="global-layout">
    <vue-element-loading :active="true" duration="6.0">
      <img src="/static/loading.gif" width="100px" height="100px">
    </vue-element-loading>

    <router-view></router-view>
  </div>
</template>

<script>
import VueElementLoading from 'vue-element-loading'

export default {
  components: { VueElementLoading },
  data () {
    return {
      // eslint-disable-next-line no-undef
    //   isShowWebview: showLoading
    }
  }
}
</script>

<style>
.global-layout {
    height: 100%;
    width: 100%;
}
</style>
