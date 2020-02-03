<template>
  <div class="errorPage">
    <div style="margin: 36px">
      <p style="text-align:center; height: 80px">
        <img src="/static/disconnect.png" class="head-img"/><span class="font-style head-style"
                                                                  style="font-size: 36px;"> 网络连接故障</span>
      </p>
      <div style="margin: 60px 120px 0px 120px">
        <p class="font-style" style="font-size: 24px;"><i class="fas fa-angle-double-down"></i> 请按以下方式操作：</p>
        <p style="font-size: 24px;">1.确认本地“iNode”连接状态正常；</p>
        <p style="font-size: 24px;">2.运行网关程序（程序位置“C:\Program Files\Jit\PNXGW”）；</p>
        <p style="font-size: 24px;">3.双击启动“PNXClientUI.exe”；</p>
        <p style="font-size: 24px;">4.双击院网关，地址“10.11.3.101”；</p>
        <p style="font-size: 24px;">5.确认网关连通后，点击下方按钮重连。</p>
      </div>
      <p style="text-align:center;">
        <button class="error-button font-style" @click="reconnect">重新连接</button>
      </p>
      <p style="float:right; margin-top:36px;"><span class="font-style" style="font-size: 24px;text-align:center;">如仍有问题请联系云雀团队 </span><span><img
        style="width: 64px;height: 64px" src="/static/lark-baby.png"/></span></p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Error',
    data () {
      return {
        msg: ''
      }
    },
    mounted () {
    },
    methods: {
      reconnect () {
        this.$router.push({ name: 'LarkPage' })
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
