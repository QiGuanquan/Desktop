import { App } from 'nw.gui'

const { manifest } = App
const options = { method: 'GET', mode: 'cors', credentials: 'include' }
const timestamp = new Date().getTime()
const newRequest = manifest.webviewSrc + timestamp

export const checkNetWork = () => {
  let connected = true
  return checkNetWorkConnected().then(status => {
    if (status !== 200) { window.location.hash = '/error' } else {
      return connected
    }
  })
}

function checkNetWorkConnected () {
  return window.fetch(newRequest, options)
    .then(
      function (response) {
        if (response.ok) {
          return response.status
        }
        throw new Error('LARK: Network response was not ok .')
      }
    )
    .catch(function (error) {
      console.log('LARK: There is a problem with fetch operation: ', error.message)
    })
}
