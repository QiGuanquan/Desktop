window.onresize = doLayout
var isLoading = false
// eslint-disable-next-line
let onloads = function () {
  var webview = document.querySelector('webview')
  doLayout()
  webview.focus()

  let gui = require('nw.gui')
  let win = gui.Window.get()
  let flag = false  // 标识当前的窗口是否最大化
  let min = document.getElementById('min')
  let max = document.getElementById('max')
  let close = document.getElementById('close')
// eslint-disable-next-line
  let isShowWindow = true

  win.on('close', function () {
    this.hide()
    isShowWindow = false
  })
  min.onclick = () => {
    win.minimize()
    min.blur()
  }
  max.onclick = () => {
    max.blur()
    if (flag) {
      win.restore()  // 如果是最大化，则恢复窗口
    } else {
      win.maximize()  // 否则，最大化窗口
    }
  }
  close.onclick = () => {
    close.blur()
    win.close()
  }
  // 监听窗口最大化事件
  win.on('maximize', () => {
    flag = true
  })
  // 监听窗口恢复事件
  win.on('restore', () => {
    flag = false
  })
  // 监听窗口关闭（到托盘）
  win.on('close', function () {
    // 标识窗口关闭（到托盘）
    isShowWindow = false
    win.close(true)
  })

  // var version = navigator.appVersion.substr(navigator.appVersion.lastIndexOf('Chrome/') + 7)
  // var match = /([0-9]*)\.([0-9]*)\.([0-9]*)\.([0-9]*)/.exec(version)
  // var majorVersion = parseInt(match[1])
  // var buildVersion = parseInt(match[3])

  // 后退
  document.querySelector('#back').onclick = function () {
    webview.back()
  }

  // 使用ie打开当前地址
  document.querySelector('#ie').onclick = function () {
    require('child_process').execSync('start iexplore ' + windowUrl)
  }

  // 使用chrome打开当前地址
  document.querySelector('#chrome').onclick = function () {
    require('child_process').execSync('start chrome ' + windowUrl)
  }

   // 使用firefox打开当前地址
  document.querySelector('#firefox').onclick = function () {
    require('child_process').execSync('start firefox ' + windowUrl)
  }

  // 前进
  // document.querySelector('#forward').onclick = function () {
  //   webview.forward()
  // }

  // 主页
  // document.querySelector('#home').onclick = function () {
  //   navigateTo('http://')
  // }

  // 重载
  document.querySelector('#reload').onclick = function () {
    if (isLoading) {
      webview.stop()
    } else {
      webview.reload()
    }
  }
  // 在加载动画重新播放时触发
  document.querySelector('#reload').addEventListener(
    'webkitAnimationIteration',
    function () {
      if (!isLoading) {
        document.body.classList.remove('loading')
      }
    })

  // 模拟崩溃
  // document.querySelector('#terminate').onclick = function () {
  //   webview.terminate()
  // }
  // var showClearDataConfirmation = function () {
  //   document.querySelector('#clear-data-overlay').style.display = '-webkit-box'
  //   document.querySelector('#clear-data-confirm').style.display = '-webkit-box'
  // }

  // var hideClearDataConfirmation = function () {
  //   document.querySelector('#clear-data-overlay').style.display = 'none'
  //   document.querySelector('#clear-data-confirm').style.display = 'none'
  // }

  // 清除缓存数据
  // document.querySelector('#clear-data').onclick = showClearDataConfirmation

  // document.querySelector('#clear-data-ok').onclick = function () {
  //   hideClearDataConfirmation()
  //
  //   var getAndResetCheckedValueBySelector = function (sel) {
  //     var val = document.querySelector(sel).checked
  //     document.querySelector(sel).checked = false
  //     return val
  //   }
  //
  //   var clearDataType = {
  //     appcache: getAndResetCheckedValueBySelector('#clear-appcache'),
  //     cookies: getAndResetCheckedValueBySelector('#clear-cookies'),
  //     fileSystems: getAndResetCheckedValueBySelector('#clear-fs'),
  //     indexedDB: getAndResetCheckedValueBySelector('#clear-indexedDB'),
  //     localStorage: getAndResetCheckedValueBySelector('#clear-localStorage'),
  //     webSQL: getAndResetCheckedValueBySelector('#clear-webSQL')
  //   }
  //
  //   if (majorVersion >= 44 || (majorVersion === 43 && buildVersion >= 2350)) {
  //     clearDataType['cache'] = getAndResetCheckedValueBySelector('#clear-cache')
  //   }
  //
  //   webview.clearData(
  //     {since: 0}, // 清除所有
  //     clearDataType,
  //     function () {
  //       webview.reload()
  //     })
  // }

  // document.querySelector('#clear-data-cancel').onclick = hideClearDataConfirmation
  // document.querySelector('#location-form').onsubmit = function (e) {
  //   e.preventDefault()
  //   navigateTo(document.querySelector('#location').value)
  // }
  webview.addEventListener('exit', handleExit)
  webview.addEventListener('loadstart', handleLoadStart)
  webview.addEventListener('loadstop', handleLoadStop)
  webview.addEventListener('loadabort', handleLoadAbort)
  webview.addEventListener('loadredirect', handleLoadRedirect)
  webview.addEventListener('loadcommit', handleLoadCommit)
  webview.addEventListener('newwindow', (e) => {
    // webview.src = e.targetUrl
      // 权限必须在用户操作下请求，例如按钮单击的事件处理函数。
    // eslint-disable-next-line no-undef
    // chrome.permissions.contains({
    //   permissions: ['tabs'],
    //   origins: [e.targetUrl]
    // }, function (granted) {
    //     // 如果用户授予了这些权限，则回调函数的参数为 true。
    //   if (granted) {
    //     alert(123)
    //   } else {
    //     alert('meiyou')
    //   }
    // })
    navigateTo(e.targetUrl)
    console.log('目标地址', e.targetUrl)
    // eslint-disable-next-line no-undef
    // chrome.tabs.create({url: e.targetUrl, windowId: 1})
  })
  // webview.addEventListener('newwindow', function (e) {
  //   e.preventDefault()
  //   if (e.targetUrl !== 'about:blank') {
  //     // Easy case where the original link or window.open()
  //     // already contains a target URL.
  //     console.log(e.targetUrl)
  //   } else {
  //     // Harder case where the guest first opens a blank
  //     // window and then redirects it via a
  //     // 'META HTTP-EQUIV="refresh"'.
  //     // newWindow_openInTabAndInterceptRedirect(e.window)
  //   }
  // })
  // if (typeof (webview.setZoom) === 'function' &&
  //   typeof (webview.find) === 'function') {
  //   var findMatchCase = false
  //
  //   document.querySelector('#zoom').onclick = function () {
  //     if (document.querySelector('#zoom-box').style.display === '-webkit-flex') {
  //       closeZoomBox()
  //     } else {
  //       openZoomBox()
  //     }
  //   }
  //
  //   document.querySelector('#zoom-form').onsubmit = function (e) {
  //     e.preventDefault()
  //     var zoomText = document.forms['zoom-form']['zoom-text']
  //     var zoomFactor = Number(zoomText.value)
  //     if (zoomFactor > 5) {
  //       zoomText.value = '5'
  //       zoomFactor = 5
  //     } else if (zoomFactor < 0.25) {
  //       zoomText.value = '0.25'
  //       zoomFactor = 0.25
  //     }
  //     webview.setZoom(zoomFactor)
  //   }
  //
  //   // 放大
  //   document.querySelector('#zoom-in').onclick = function (e) {
  //     e.preventDefault()
  //     increaseZoom()
  //   }
  //
  //   // 缩小
  //   document.querySelector('#zoom-out').onclick = function (e) {
  //     e.preventDefault()
  //     decreaseZoom()
  //   }
  //
  //   // 查找
  //   document.querySelector('#find').onclick = function () {
  //     if (document.querySelector('#find-box').style.display === 'block') {
  //       document.querySelector('webview').stopFinding()
  //       closeFindBox()
  //     } else {
  //       openFindBox()
  //     }
  //   }
  //
  //   // 查找文本
  //   document.querySelector('#find-text').oninput = function (e) {
  //     webview.find(document.forms['find-form']['find-text'].value,
  //       {matchCase: findMatchCase})
  //   }
  //
  //   document.querySelector('#find-text').onkeydown = function (e) {
  //     if (event.ctrlKey && event.keyCode === 13) {
  //       e.preventDefault()
  //       webview.stopFinding('activate')
  //       closeFindBox()
  //     }
  //   }
  //
  //   document.querySelector('#match-case').onclick = function (e) {
  //     e.preventDefault()
  //     findMatchCase = !findMatchCase
  //     var matchCase = document.querySelector('#match-case')
  //     if (findMatchCase) {
  //       matchCase.style.color = 'blue'
  //       matchCase.style['font-weight'] = 'bold'
  //     } else {
  //       matchCase.style.color = 'black'
  //       matchCase.style['font-weight'] = ''
  //     }
  //     webview.find(document.forms['find-form']['find-text'].value,
  //       {matchCase: findMatchCase})
  //   }
  //
  //   document.querySelector('#find-backward').onclick = function (e) {
  //     e.preventDefault()
  //     webview.find(document.forms['find-form']['find-text'].value,
  //       {backward: true, matchCase: findMatchCase})
  //   }
  //
  //   document.querySelector('#find-form').onsubmit = function (e) {
  //     e.preventDefault()
  //     webview.find(document.forms['find-form']['find-text'].value,
  //       {matchCase: findMatchCase})
  //   }
  //
  //   webview.addEventListener('findupdate', handleFindUpdate)
  //   window.addEventListener('keydown', handleKeyDown)
  // } else {
  //   var zoom = document.querySelector('#zoom')
  //   var find = document.querySelector('#find')
  //   zoom.style.visibility = 'hidden'
  //   zoom.style.position = 'absolute'
  //   find.style.visibility = 'hidden'
  //   find.style.position = 'absolute'
  // }
}

// 导航
// eslint-disable-next-line no-unused-vars
function navigateTo (url) {
  resetExitedState()
  var webview = document.querySelector('webview')
  webview.focus()
  webview.src = url
}

function doLayout () {
  var webview = document.querySelector('webview')
  var controls = document.querySelector('#controls')
  var controlsHeight = controls.offsetHeight
  var windowWidth = document.documentElement.clientWidth
  var windowHeight = document.documentElement.clientHeight
  var webviewWidth = windowWidth
  var webviewHeight = windowHeight - controlsHeight

  webview.style.width = webviewWidth + 'px'
  webview.style.height = webviewHeight + 'px'

  // var sadWebview = document.querySelector('#sad-webview')
  // sadWebview.style.width = webviewWidth + 'px'
  // sadWebview.style.height = webviewHeight * 2 / 3 + 'px'
  // sadWebview.style.paddingTop = webviewHeight / 3 + 'px'
}

function handleExit (event) {
  document.body.classList.add('exited')
  if (event.type === 'abnormal') {
    document.body.classList.add('crashed')
  } else if (event.type === 'killed') {
    document.body.classList.add('killed')
  }
}

function resetExitedState () {
  document.body.classList.remove('exited')
  document.body.classList.remove('crashed')
  document.body.classList.remove('killed')
}

// function handleFindUpdate (event) {
//   var findResults = document.querySelector('#find-results')
//   if (event.searchText === '') {
//     findResults.innerText = ''
//   } else {
//     findResults.innerText =
//       event.activeMatchOrdinal + ' of ' + event.numberOfMatches
//   }
//
//   if (event.finalUpdate && !event.canceled) {
//     var findBox = document.querySelector('#find-box')
//     findBox.style.left = ''
//     findBox.style.opacity = ''
//     var findBoxRect = findBox.getBoundingClientRect()
//     if (findBoxObscuresActiveMatch(findBoxRect, event.selectionRect)) {
//       var potentialLeft = event.selectionRect.left - findBoxRect.width - 10
//       if (potentialLeft >= 5) {
//         findBox.style.left = potentialLeft + 'px'
//       } else {
//         findBox.style.opacity = '0.5'
//       }
//     }
//   }
// }

// function findBoxObscuresActiveMatch (findBoxRect, matchRect) {
//   return findBoxRect.left < matchRect.left + matchRect.width &&
//     findBoxRect.right > matchRect.left &&
//     findBoxRect.top < matchRect.top + matchRect.height &&
//     findBoxRect.bottom > matchRect.top
// }

// 识别快捷键
// function handleKeyDown (event) {
//   if (event.ctrlKey) {
//     switch (event.keyCode) {
//       // Ctrl+F.
//       case 70:
//         event.preventDefault()
//         openFindBox()
//         break
//
//       // Ctrl++.
//       case 107:
//       case 187:
//         event.preventDefault()
//         increaseZoom()
//         break
//
//       // Ctrl+-.
//       case 109:
//       case 189:
//         event.preventDefault()
//         decreaseZoom()
//     }
//   }
// }

function handleLoadCommit (event) {
  resetExitedState()
  if (!event.isTopLevel) {
    return
  }

  document.querySelector('#location').value = event.url

  var webview = document.querySelector('webview')
  document.querySelector('#back').disabled = !webview.canGoBack()
  // document.querySelector('#forward').disabled = !webview.canGoForward()
  // closeBoxes()
}

let windowUrl = ''
function handleLoadStart (event) {
  windowUrl = event.url
  document.body.classList.add('loading')
  isLoading = true

  // eslint-disable-next-line no-undef
  chrome.contextMenus.create({
    'id': 'someuniquerid',
    'title': 'RedditP That Shizz!',
    'type': 'normal',
    'contexts': ['link'],
    'targetUrlPatterns': ['*://*.reddit.com/r*']
  })

  // // eslint-disable-next-line no-undef
  // chrome.contextMenus.onClicked.addListener(function (e) {
  //   if (e.menuItemId === 'someuniquerid') {
  //     // eslint-disable-next-line no-undef
  //     chrome.tabs.getSelected(function (tab) {
  //       alert('终于！')
  //     })
  //   }
  // })

  resetExitedState()
  if (!event.isTopLevel) {
    return
  }

  document.querySelector('#location').value = event.url
}

function handleLoadStop (event) {
  isLoading = false
}

function handleLoadAbort (event) {
  console.log('LoadAbort')
  console.log('  url: ' + event.url)
  console.log('  isTopLevel: ' + event.isTopLevel)
  console.log('  type: ' + event.type)
}

function handleLoadRedirect (event) {
  resetExitedState()
  if (!event.isTopLevel) {
    return
  }

  document.querySelector('#location').value = event.newUrl
}

// function getNextPresetZoom (zoomFactor) {
//   var preset = [0.25, 0.33, 0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2,
//     2.5, 3, 4, 5]
//   var low = 0
//   var high = preset.length - 1
//   var mid
//   while (high - low > 1) {
//     mid = Math.floor((high + low) / 2)
//     if (preset[mid] < zoomFactor) {
//       low = mid
//     } else if (preset[mid] > zoomFactor) {
//       high = mid
//     } else {
//       return {low: preset[mid - 1], high: preset[mid + 1]}
//     }
//   }
//   return {low: preset[low], high: preset[high]}
// }

// function increaseZoom () {
//   var webview = document.querySelector('webview')
//   webview.getZoom(function (zoomFactor) {
//     var nextHigherZoom = getNextPresetZoom(zoomFactor).high
//     webview.setZoom(nextHigherZoom)
//     document.forms['zoom-form']['zoom-text'].value = nextHigherZoom.toString()
//   })
// }

// function decreaseZoom () {
//   var webview = document.querySelector('webview')
//   webview.getZoom(function (zoomFactor) {
//     var nextLowerZoom = getNextPresetZoom(zoomFactor).low
//     webview.setZoom(nextLowerZoom)
//     document.forms['zoom-form']['zoom-text'].value = nextLowerZoom.toString()
//   })
// }

// function openZoomBox () {
//   document.querySelector('webview').getZoom(function (zoomFactor) {
//     var zoomText = document.forms['zoom-form']['zoom-text']
//     zoomText.value = Number(zoomFactor.toFixed(6)).toString()
//     document.querySelector('#zoom-box').style.display = '-webkit-flex'
//     zoomText.select()
//   })
// }

// function closeZoomBox () {
//   document.querySelector('#zoom-box').style.display = 'none'
// }

// function openFindBox () {
//   document.querySelector('#find-box').style.display = 'block'
//   document.forms['find-form']['find-text'].select()
// }

// function closeFindBox () {
//   var findBox = document.querySelector('#find-box')
//   findBox.style.display = 'none'
//   findBox.style.left = ''
//   findBox.style.opacity = ''
//   document.querySelector('#find-results').innerText = ''
// }

// function closeBoxes () {
//   closeZoomBox()
//   closeFindBox()
// }
