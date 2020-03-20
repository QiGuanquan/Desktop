  // eslint-disable-next-line
var popup = (function (configModule) {
  // var dce = function (str) { return document.createElement(str) }

  // var cfg = configModule.popupConfirmBox
  // var popupBoxTemplate = dce('li')
  // popupBoxTemplate.innerHTML = cfg.innerHTML

  var PopupConfirmBoxList = function (listElement) {
    this.listElement = listElement
    this.list = []
  }

  PopupConfirmBoxList.prototype.getListElement = function () {
    return this.listElement
  }

  PopupConfirmBoxList.prototype.append = function (event) {
    var box = new PopupConfirmBox(this, event)
    this.list.push(box)
    // this.listElement.appendChild(box.getBoxElement())
  }

  PopupConfirmBoxList.prototype.removeBox = function (box) {
    for (var i = 0; i < this.list.length; ++i) {
      if (this.list[i] === box) {
        this.listElement.removeChild(box.getBoxElement())
        this.list.splice(i, 1)
        break
      }
    }
  }

  var PopupConfirmBox = function (popupList, event) {
    this.popupList = popupList
    this.event = event
    this.url = event.targetUrl
    // this.boxElement = popupBoxTemplate.cloneNode(true)
    // this.initBoxElement()
  }

  // PopupConfirmBox.prototype.initBoxElement = function () {
  //   var urlSpan = this.boxElement.querySelector('.' + cfg.urlSpanClass)
  //   var acceptLink = this.boxElement.querySelector('.' + cfg.acceptLinkClass)
  //   var denyLink = this.boxElement.querySelector('.' + cfg.denyLinkClass)

  //   urlSpan.innerText = this.url;

  //   (function (box) {
  //     acceptLink.addEventListener('click', function (e) { box.doAccept() })
  //     denyLink.addEventListener('click', function (e) { box.doDeny() })
  //   }(this))
  // }

  PopupConfirmBox.prototype.getBoxElement = function () {
    return this.boxElement
  }

  PopupConfirmBox.prototype.doAccept = function () {
    (function (box) {
        // eslint-disable-next-line
      chrome.app.window.create(
          'browser.html',
          function (newWindow) {
            newWindow.contentWindow.newWindowEvent = box.event
          })
    }(this))
    // window.addEventListener('newwindow', (e) => {
    //   console.log('asdasdasdas')
    //   console.log(e)
    // })

    // this.popupList.removeBox(this)
    // this.detach()
  }

  PopupConfirmBox.prototype.doDeny = function () {
    this.event.window.discard()

    this.popupList.removeBox(this)
    // this.detach()
  }

  PopupConfirmBox.prototype.detach = function () {
    this.popupList = null
  }

  return {
    'PopupConfirmBoxList': PopupConfirmBoxList,
    'PopupConfirmBox': PopupConfirmBox
  }
    // eslint-disable-next-line
}(config))
