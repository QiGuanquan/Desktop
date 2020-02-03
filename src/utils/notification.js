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

export default notification
