'use strict'

// import { App } from 'nw.gui'
import gui from 'nw.gui'
/**
 * 创建浏览器窗
 */
export function createBrowser (e) {
  gui.Window.open('../../static/browser/browser.html?URL=' + encodeURIComponent(e.targetUrl), {
    id: 'browserWindow',
    position: 'center',
    new_instance: true,
    focus: true,
    width: 1200,
    height: 900,
    min_width: 1024,
    min_height: 768,
    resizable: true,
    title: '云雀浏览器',
    frame: false
  })
}
