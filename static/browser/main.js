
// eslint-disable-next-line no-undef
chrome.app.runtime.onLaunched.addListener(function () {
  runApp()
})

// eslint-disable-next-line no-undef
chrome.app.runtime.onRestarted.addListener(function () {
  runApp()
})

function runApp () {
  // eslint-disable-next-line no-undef
  chrome.app.window.create(
    'browser.html',
    {'id': 'initialBrowserWindowID', 'state': 'maximized'},
    function (newWindow) {
      newWindow.contentWindow.newWindowEvent = null
    })
}
