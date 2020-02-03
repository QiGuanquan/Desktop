<template>
  <div class="lark-router">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'app'
}
</script>
<style scoped>
.lark-router {
  width: 100%;
  height: calc(100vh - 24px);
}
</style>
