<template>
  <div class="errorPage">
    <div style="margin: 36px">
      <p style="text-align:center; height: 80px">
        <img src="/static/disconnect.png" class="head-img"/><span class="font-style head-style"
                                                                  style="font-size: 36px;"> 网络连接故障</span>
      </p>
      <div style="margin: 60px 120px 0px 120px">
        <p class="font-style" style="font-size: 24px;"><i class="fas fa-angle-double-down"></i> 请按以下方式操作：</p>
        <p style="font-size: 20px;">·检查您的<strong>网络连接状态</strong>或<strong>网关连接状态</strong>；</p>
        <p style="font-size: 20px;">·确认连接成功之后，请点击下方<strong>重新连接</strong>按钮；</p>
        <p style="font-size: 20px;">·如仍出现当前界面，请咨询您所在单位信息中心。</p>
      </div>
      <p style="text-align:center;marginTop:64px">
        <button class="error-button font-style" @click="reconnect">重新连接</button>
      </p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'error',
    data () {
      return {
        msg: ''
      }
    },
    mounted () {
      this.$store.commit('SET_IS_SHOW_LOADING', false)
    },
    methods: {
      reconnect () {
        this.$router.push({ name: 'Login' })
      }
    }
  }
</script>
<style scoped>
  .errorPage {
    background-color: #eeeeee;
    height: 100%;
  }

  h2, h3 {
    margin-top: 40px;
    margin-left: 35%;
  }

  h1 {
    text-align: center
  }

  .font-style {
    font-family: SimHei;
  }

  .head-style {
    display: inline-block;
    font-size: 12px;
    line-height: 30px;
    vertical-align: middle;
    margin-left: 12px;
  }

  .head-img {
    height: 64px;
    width: 64px;
    vertical-align: middle;
    display: inline-block;
  }

  .error-button {
    display: inline-block;
    padding: 15px 25px;
    font-size: 24px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #4CAF50;
    border: none;
    border-radius: 15px;
    box-shadow: 0 9px #999;
  }

  .error-button:hover {
    background-color: #3e8e41
  }

  .error-button:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
</style>
