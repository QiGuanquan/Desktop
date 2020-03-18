// eslint-disable-next-line
var browser = (function (configModule, tabsModule) {
  var dce = function (str) { return document.createElement(str) }
  var Browser = function (
    controlsContainer,
    back,
    forward,
    home,
    reload,
    locationForm,
    locationBar,
    tabContainer,
    contentContainer,
    ie,
    chrome,
    firefox,
    newTabElement) {
    this.controlsContainer = controlsContainer
    this.back = back
    this.forward = forward
    this.reload = reload
    this.home = home
    this.ie = ie
    this.chrome = chrome
    this.firefox = firefox
    this.locationForm = locationForm
    this.locationBar = locationBar
    this.tabContainer = tabContainer
    this.contentContainer = contentContainer
    this.newTabElement = newTabElement
    this.tabs = new tabsModule.TabList(
        'tabs',
        this,
        tabContainer,
        contentContainer,
        newTabElement)

    this.init()
  }

  Browser.prototype.init = function () {
    (function (browser) {
      window.addEventListener('resize', function (e) {
        browser.doLayout(e)
      })

      window.addEventListener('keydown', function (e) {
        browser.doKeyDown(e)
      })

      browser.ie.addEventListener('click', function (e) {
        var tab = browser.tabs.getSelected()
        var webview = tab.getWebview()
        require('child_process').execSync('start iexplore ' + webview.src)
      })

      browser.chrome.addEventListener('click', function (e) {
        var tab = browser.tabs.getSelected()
        var webview = tab.getWebview()
        require('child_process').execSync('start chrome ' + webview.src)
      })

      browser.firefox.addEventListener('click', function (e) {
        var tab = browser.tabs.getSelected()
        var webview = tab.getWebview()
        require('child_process').execSync('start firefox ' + webview.src)
      })

      browser.back.addEventListener('click', function (e) {
        browser.tabs.getSelected().goBack()
      })

      browser.forward.addEventListener('click', function () {
        browser.tabs.getSelected().goForward()
      })

      browser.home.addEventListener('click', function () {
        browser.tabs.getSelected().navigateTo(configModule.homepage)
      })

      browser.reload.addEventListener('click', function () {
        var tab = browser.tabs.getSelected()
        if (tab.isLoading()) {
          tab.stopNavigation()
        } else {
          tab.doReload()
        }
      })
      browser.reload.addEventListener(
        'webkitAnimationIteration',
        function () {
          if (!browser.tabs.getSelected().isLoading()) {
            document.body.classList.remove('loading')
          }
        }
      )

      browser.locationForm.addEventListener('submit', function (e) {
        e.preventDefault()
        browser.tabs.getSelected().navigateTo(browser.locationBar.value)
      })

      // 点击加号创建新的标签页（配合popconfig中的home地址使用）
      // browser.newTabElement.addEventListener(
      //   'click',
      //   function (e) { return browser.doNewTab(e) })

      window.addEventListener('message', function (e) {
        if (e.data) {
          var data = JSON.parse(e.data)
          if (data.name && data.title) {
            browser.tabs.setLabelByName(data.name, data.title)
          } else {
            console.warn(
                'Warning: Expected message from guest to contain {name, title}, but got:',
                data)
          }
        } else {
          console.warn('Warning: Message from guest contains no data')
        }
      })

      window.addEventListener('newwindow', (e) => {
        var tabSelected = browser.tabs.getSelected()
        tabSelected.navigateTo(e.targetUrl)
      })

      // 窗口大小变化，tab页大小随之改变
      window.addEventListener('resize', (e) => {
        browser.tabs.setTabWidth()
      })

      var webview = dce('webview')
      var tab = browser.tabs.append(webview)

      if (window.newWindowEvent) {
        window.newWindowEvent.window.attach(webview)
      } else {
        tab.navigateTo(configModule.homepage)
      }
      browser.tabs.selectTab(tab)
    }(this))
  }

  Browser.prototype.doLayout = function (e) {
    var contentWidth = this.contentContainer.clientWidth
    var contentHeight = this.contentContainer.clientHeight

    var tab = this.tabs.getSelected()
    var webview = tab.getWebview()
    var webviewContainer = tab.getWebviewContainer()

    var layoutElements = [
      webviewContainer,
      webview]
    for (var i = 0; i < layoutElements.length; ++i) {
      layoutElements[i].style.width = contentWidth + 'px'
      layoutElements[i].style.height = contentHeight + 'px'
    }
  }

  // 打开新标签，不是从现有页面打开的
  Browser.prototype.doNewTab = function (e) {
    // if (tab.tabList.list.length > 5) {
    // console.log(document.getElementById('#newLi').style)
    // }
    // console.log(this.tabs.labelContainer.width)
    var tab = this.tabs.append(dce('webview'))
    tab.navigateTo(configModule.homepage)
    this.tabs.selectTab(tab)
    return tab
  }

  Browser.prototype.doKeyDown = function (e) {
    if (e.ctrlKey) {
      switch (e.keyCode) {
        // Ctrl+T
        case 84:
          this.doNewTab()
          break
        // Ctrl+W
        case 87:
          e.preventDefault()
          this.tabs.removeTab(this.tabs.getSelected())
          break
      }
      // Ctrl + [1-9]
      if (e.keyCode >= 49 && e.keyCode <= 57) {
        var idx = e.keyCode - 49
        if (idx < this.tabs.getNumTabs()) {
          this.tabs.selectIdx(idx)
        }
      }
    }
  }

  Browser.prototype.doTabNavigating = function (tab, url) {
    if (tab.selected) {
      document.body.classList.add('loading')
      this.locationBar.value = url
    }
  }

  Browser.prototype.doTabNavigated = function (tab, url) {
    this.updateControls()
  }

  Browser.prototype.doTabSwitch = function (oldTab, newTab) {
    this.updateControls()
  }

  Browser.prototype.updateControls = function () {
    var selectedTab = this.tabs.getSelected()
    if (selectedTab.isLoading()) {
      document.body.classList.add('loading')
    }
    var selectedWebview = selectedTab.getWebview()
    this.back.disabled = !selectedWebview.canGoBack()

    if (this.back.disabled === true) {
      // this.back.setAttribute('style', 'background-image:url(/static/backDisabled.png)')
    }
    this.forward.disabled = !selectedWebview.canGoForward()
    if (this.locationBar.value !== selectedTab.url) {
      this.locationBar.value = selectedTab.url
    }
  }

  return {'Browser': Browser}
// eslint-disable-next-line
})(config, tabs)
