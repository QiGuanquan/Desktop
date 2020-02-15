const notification = {
  icon: 'http://yourimage.jpg',
  body: 'Here is the notification text',
  notif: function (options) {
    const notific = new Notification('Notification Title', options)
    notific.onclick = function () {
    }
    notific.onshow = function () {
      // play sound on show
      // auto close after 1 second
      setTimeout(function () {
        notific.close()
      }, 10000)
    }
  }
}
// // 监听webview中的console消息
export function createNotification (event) {
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
}

export default notification
