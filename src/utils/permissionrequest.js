'use strict'

export function handleRequest (e) {
  if (e.permission === 'download') {
    e.request.allow()
    /**
 * 监听下载状态，下载完成后默认打开
 */
/* eslint-disable no-undef */
    chrome.downloads.onChanged.addListener(({id, state = {}, error}) => {
      if (state.current === chrome.downloads.State.COMPLETE) {
    /* eslint-disable no-undef */
        chrome.downloads.show(id)
      }
    })
  }
  // 处理其它权限请求
}

