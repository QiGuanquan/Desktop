'use strict'

// import { App } from 'nw.gui'
import gui from 'nw.gui'
/**
 * 创建浏览器窗
 */
export function createBrowser (e) {
  // gui.Window.get().on('browserWindow', 'new-win-policy', function (frame, url, policy) {
  //   // 不打开窗口
  //   console.log('frame', frame)
  //   console.log('url', url)
  //   policy.forceCurrent()
  //   // 在系统默认浏览器打开
  //   // gui.Shell.openExternal(url)
  // })
  gui.Window.open('../../static/browser/browser.html?URL=' + encodeURIComponent(e.targetUrl), {
    id: 'browserWindow',
    position: 'center',
    new_instance: false,
    focus: true,
    width: 1200,
    height: 900,
    min_width: 1024,
    min_height: 768,
    resizable: true,
    title: '云雀浏览器',
    frame: false
  }, function (win) {
    // 监听新窗口焦点事件
    win.window.miniBrowser.doNewTab(e)
  })
}
