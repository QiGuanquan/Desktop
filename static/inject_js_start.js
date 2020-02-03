let gui = require('nw.gui')

// window.onload = function(){
//   var url=document.location.href;  //获取浏览器访问栏里的地址
//   if( url.indexOf("r=")==-1 ){    //判断地址后面是否多了某些值，没有就进方法里进行刷新
//     let t = new Date();
//     window.location.href = url+"?r="+t.getTime();
//   }
// } 

gui.Window.get().on('new-win-policy', function (frame, url, policy) {
    // 不打开窗口
    policy.setNewWindowManifest(
        {
            frame:true,
            title:'云雀',
            new_instance:false
            // inject_js_end:location.reload()
        }
    )
    policy.forceCurrent()
    // // 在系统默认浏览器打开
  })
