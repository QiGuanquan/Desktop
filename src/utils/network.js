import { App } from 'nw.gui'

const { manifest } = App
const options = { method: 'GET', mode: 'cors', credentials: 'include' }

export const checkNetWork = () => {
  let connected = true
  return checkNetWorkConnected().then(status => {
    if (status === 200) { return connected }
    window.location.hash = '/error'
  })
}

function checkNetWorkConnected () {
  return window.fetch(manifest.webviewSrc, options)
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
