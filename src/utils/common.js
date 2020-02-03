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
  let __this = this

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
