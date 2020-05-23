/**
* 通用方法主要是操作本地文件
*/
/**
* 检测某APP是否存在
*/
export function appHasExits (appName) {
  var cmd = process.platform === 'win32' ? 'tasklist' : 'ps aux'
  var processname = appName
  var cp = require('child_process')
  var nwexec = cp.spawn('cmd.exe', ['/s', '/c', cmd])
  var num = 0
  nwexec.on('close', function (code) {
    nwexec.kill()
    if (num > 0) {
      return true
    } else {
      return false
    }
  })
  nwexec.stdout.on('data', function (data) {
    var stdout = data.toString()
    stdout = stdout.trim()
    if (stdout.indexOf(processname) >= 0) {
      num++
    }
  })
}

/**
* cmd命令
* param p cmd命令
*/
export function cmd (p) {
  // 操作cmd命令行
  let exec = require('child_process').exec
  let iconv = require('iconv-lite')
  let encoding = 'cp936'
  let binaryEncoding = 'binary'
  // let __this = this

  function puts (error, stdout, stderr) {
    if (error) {
      window.location.hash = '/error'
    } else {
      this.isLoading = false
    }
    console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding), iconv.decode(new Buffer(stderr, binaryEncoding), encoding))
    console.log(error)
  }
  exec(p, { encoding: binaryEncoding }, puts)
}

/**
* 清除缓存
*/
export function clearCache () {
  try {
    window.nw.App.clearCache()
    window.chrome.browsingData.remove({
      since: 0
    }, {
      appcache: true,
      cache: true,
      cookies: true,
      downloads: true,
      fileSystems: true,
      formData: true,
      history: true,
      indexedDB: true,
      localStorage: true,
      pluginData: true,
      passwords: true,
      serverBoundCertificates: true,
      serviceWorkers: true,
      webSQL: true
    }, function () {
      console.log('clear cache success!!!')
    })
  } catch (e) {
    alert(e)
  }
}
/**
* 版本比较
* 返回 0：版本相同
*/
export function compareVersion (a, b) {
  try {
    if (a === b) {
      return 0
    }
    var componentsA = a.split('.')
    var componentsB = b.split('.')
    var len = Math.min(componentsA.length, componentsB.length)
    // loop while the components are equal
    for (var i = 0; i < len; i++) {
        // A bigger than B
      if (parseInt(componentsA[i]) > parseInt(componentsB[i])) {
        return 1
      }
        // B bigger than A
      if (parseInt(componentsA[i]) < parseInt(componentsB[i])) {
        return -1
      }
    }
    // If one's a prefix of the other, the longer one is greater.
    if (componentsA.length > componentsB.length) {
      return 1
    }
    if (componentsA.length < componentsB.length) {
      return -1
    }
    // Otherwise they are the same.
    return 0
  } catch (e) {
    return -1
  }
}

/**
 * 获取url地址参数对象
 * @param {String}} url 待解析地址
 */
export function getUrlParamsObject (url) {
  var result = {}
  var query = url.split('?')[1]
  var queryArr = query.split('&')
  queryArr.forEach(function (item) {
    var value = item.split('=')[1]
    var key = item.split('=')[0]
    result[key] = value
  })
  return result
}
/**
 * **************************************************************
 * ******************** lark viewer 临时增加 ********************
 * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
 */
/**
 * 打开本地应用程序
 * @param {String} url 待处理的地址
 */
export function openLocalApplication (url) {
  const paramsString = getUrlParamsObject(url).data
  const paramsData = JSON.parse(decodeURIComponent(paramsString))

  handleFilePreview(paramsData)
}

const handleFilePreview = (data) => {
  const humane = require('humane-js')
  humane.timeout = 0
  humane.info('正在生成预览,请稍候')
  console.log('cwd', process.cwd())
  console.log('PREVIEW', data)
  // download and save
  downloadAndSave(data, openPreviewPlugin)
}

/**
 * download and save file to local
 * @param {String} Authorization user token
 * @param {*} downloadUrl download url
 */
const downloadAndSave = ({ Authorization, downloadUrl, extension }, callback) => {
  const fs = require('fs')
  const path = require('path')
  const axios = require('axios')
  const humane = require('humane-js')
  axios.get(downloadUrl, {
    headers: { Authorization },
    responseType: 'stream'
  }).then((response) => {
    const targetPath = path.resolve(path.dirname(process.execPath), '/temp')
    const fileName = `${+new Date()}.${extension}`
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath)
    }
    const savePath = path.resolve(targetPath, fileName)
    const writer = fs.createWriteStream(savePath)
    response.data.pipe(writer)
    writer.on('finish', () => {
      callback(savePath)
    })
  }).catch(error => {
    humane.remove(() => console.error(error))
  })
}

/**
 * open preview plugin
 * @param {String} filePath target file path
 */
const openPreviewPlugin = (filePath) => {
  const childProcess = require('child_process')
  const humane = require('humane-js')
  const path = require('path')
  const pluginPath = path.resolve(path.dirname(process.execPath), '/viewer/bin/LarkViewer.exe')
  const commond = `"${pluginPath}" -filepath ${filePath}`
  childProcess.exec(commond, {}, (error) => {
    if (error) { humane.remove() }
  })
  setTimeout(() => {
    humane.remove(() => { console.log('closed') })
  })
}
/**
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * ******************** lark viewer 临时增加 ********************
 * **************************************************************
 */
