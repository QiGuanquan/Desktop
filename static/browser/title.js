var webviewTitleInjectionComplete = false;
(function () {
  if (!webviewTitleInjectionComplete) {
    var embedder = null
    var tabName = null
    var listenersAreBound = false
    var title = null
    var postTitle = (function () {
      return function (e) {
        title = document.title
        var data = {
          'name': tabName,
          'title': title || '[no title]'
        }
        embedder.postMessage(JSON.stringify(data), '*')
      }
    }())
    var bindEmbedder = function (e) {
      embedder = e.source
    }
    var bindTabName = function (e) {
      if (e.data) {
        var data = JSON.parse(e.data)
        if (data.name) {
          tabName = data.name
        } else {
          console.warn('警告: 没有tab名称')
        }
      } else {
        console.warn('警告: 没有数据')
      }
    }

    // 从嵌入的webview中监听消息
    window.addEventListener('message', function (e) {
      if (!listenersAreBound) {
        bindEmbedder(e)
        bindTabName(e)

        var titleElement = document.querySelector('title')
        if (titleElement) {
          titleElement.addEventListener('change', postTitle)
        } else {
          console.warn('警告: 没有 <title> 元素绑定')
          postTitle()
        }

        if (title === null) {
          postTitle()
        }

        listenersAreBound = true
      }
    })
  }
}())
