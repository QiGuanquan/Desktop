// // eslint-disable-next-line no-unused-vars
// let gui = require('nw.gui')
// window.onload = function () {
//   function getArgs () {
//     var args = {}
//     var query = location.search.substring(1)     // Get query string
//     var pairs = query.split('&')                 // Break at ampersand
//     for (var i = 0; i < pairs.length; i++) {
//       var pos = pairs[i].indexOf('=')          // Look for "name=value"
//       if (pos === -1) continue                  // If not found, skip
//       var argname = pairs[i].substring(0, pos)  // Extract the name
//       var value = pairs[i].substring(pos + 1)    // Extract the value
//       value = decodeURIComponent(value)        // Decode it, if needed
//       args[argname] = value                    // Store as a property
//     }
//     return args                                  // Return the object
//   }

//   prepareFrame(getArgs().URL)
//   // eslint-disable-next-line
//   onloads()
// }
// let abc = ''
// function prepareFrame (urlTemp) {
//   var newWebview = document.createElement('webview')
//   newWebview.setAttribute('id', 'webview')
//   newWebview.setAttribute('class', 'browser-webview')
//   newWebview.setAttribute('src', decodeURIComponent(urlTemp))
//   newWebview.style.height = '100%'
//   newWebview.style.width = '100%'
//   newWebview.style.display = 'flex'
//   newWebview.autosize = 'on'
//   newWebview.minwidth = '1200px'
//   newWebview.minheight = '900px'
//   document.getElementById('webviewContainer').appendChild(newWebview)
//   this.abc = decodeURIComponent(urlTemp)
// }
// 全局配置
function getArgs () {
  var args = {}
  var query = location.search.substring(1)     // Get query string
  var pairs = query.split('&')                 // Break at ampersand
  for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf('=')          // Look for "name=value"
    if (pos === -1) continue                  // If not found, skip
    var argname = pairs[i].substring(0, pos)  // Extract the name
    var value = pairs[i].substring(pos + 1)    // Extract the value
    value = decodeURIComponent(value)        // Decode it, if needed
    args[argname] = value                    // Store as a property
  }
  return args                                  // Return the object
}
let newWindowUrl = decodeURIComponent(getArgs().URL)
// eslint-disable-next-line
var config = {
  // 'homepage': 'http://www.baidu.com/',
  'homepage': newWindowUrl,
  'popupConfirmBox': {
    'innerHTML': '当前 <span class="popup-url"></span> 是否允许弹出新的? <a href="#popup-allow" class="popup-allow">行</a> <a href="#popup-deny" class="popup-deny">不行</a>',
    'urlSpanClass': 'popup-url',
    'acceptLinkClass': 'popup-allow',
    'denyLinkClass': 'popup-deny'
  }
}
