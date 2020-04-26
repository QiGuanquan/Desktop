// eslint-disable-next-line
var mainBrowser = null;
(function (browserModule) {
  var query = function (str) { return document.querySelector(str) }

  window.addEventListener('load', function (e) {
    mainBrowser = new browserModule.Browser(
        query('#controls'),
        query('#back'),
        query('#forward'),
        query('#home'),
        query('#reload'),
        query('#location-form'),
        query('#location'),
        query('#tab-container'),
        query('#content-container'),
        query('#ie-btn'),
        query('#chrome-btn'),
        query('#firefox-btn')
        // query('#new-tab')
        )
    window.miniBrowser = mainBrowser
  })
// eslint-disable-next-line
})(browser)
