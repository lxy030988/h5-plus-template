/**和原生交互的lib */
import { platForms } from '@/libs/util'

let noop = function () {} //设置空函数

let mvJsBridge = {
  messageCallBack: {} //内部透传事件列表
} //存储桥函数

//原生插件库是否加载完成
let WebViewJavascriptBridgeReady = false

//用于存储事件桥未加载完成之前的事件列表
let handlerMap = []

/**
 * 注册方法，给原生调用
 * @param {String} name 注册名
 * @param {function} callback 回调
 */
mvJsBridge.registerHandler = function (name, callback) {
  if (platForms.isApp()) {
    if (WebViewJavascriptBridgeReady) {
      window.WebViewJavascriptBridge.registerHandler(name, function (resData, responseCallback) {
        if (!!resData && typeof resData != 'object') {
          resData = JSON.parse(resData)
        }
        callback(resData, responseCallback)
      })
    } else {
      handlerMap.push({
        type: 'registerHandler',
        name: name,
        callback: callback
      })
    }
  }
}
/**
 * 调用原生方法
 * @param {name} name 注册名
 * @param {Object} data 发送数据
 * @param {function} callback 回掉
 */
mvJsBridge.callHandler = function (name, data = {}, callback = noop) {
  if (platForms.isApp()) {
    if (WebViewJavascriptBridgeReady) {
      window.WebViewJavascriptBridge.callHandler(name, data, function (resData) {
        if (!!resData && typeof resData != 'object') {
          resData = JSON.parse(resData)
        }
        callback(resData)
      })
    } else {
      handlerMap.push({
        type: 'callHandler',
        name: name,
        data: data,
        callback: callback
      })
    }
  }
}
/**
 * 发送消息,内部广播
 * @param {Object} params 发送数据
 * @param {function} callback 回调
 */
mvJsBridge.send = function (params = {}, callback = noop) {
  if (platForms.isApp()) {
    if (WebViewJavascriptBridgeReady) {
      window.WebViewJavascriptBridge.send(params, function (resData) {
        if (!!resData && typeof resData != 'object') {
          resData = JSON.parse(resData)
        }
        callback(resData)
      })
    } else {
      handlerMap.push({
        type: 'send',
        data: params,
        callback: callback
      })
    }
  }
}
/**
 * 指定页面发送消息
 * @param {Object} params 发送数据
 * @param {Object} params.data 传输的数据
 * @param {Array} params.names 发送的page name数组
 */
mvJsBridge.sendToPage = function (params = {}) {
  mvJsBridge.callHandler('informWebView', params)
}

/**
 * 打开新窗口
 * @param {Object} options 参数
 * @param {String} options.title 标题，可为空，为空则取 webview 的动态title
 * @param {String} options.titleColor 字体颜色，为空则为默认颜色
 * @param {Boolean} options.hasBack 是否有返回按钮，默认true
 * @param {String} options.barColor 导航条颜色，为空则是默认颜色
 * @param {String} options.url 必填，打开window 的url
 * @param {Boolean} options.isLocal 打开是否是本地的url,默认false
 * @param {Number} options.opacity 导航条透明度，0-1，默认1
 * @param {Boolean} options.pullDown 是否有下拉刷新，默认false
 * @param {Array} options.toolsWay 工具栏，字典字段如下
 * @param {String} icon 显示的图标，为空则显示文字
 * @param {String} text 为空则显示icon，默认显示icon
 * @param {String} name 回调的name名字
 * @param {Number} options.navType 导航条类型，1常规，2 滑动渐变(opacity,fullView无效) 3 无导航条
 * @param {Boolean} barLoading 导航条是否带进度条,默认false
 * @param {String} pageName 必填， page的名称,默认 mvPage
 * @param {String} pageIsRepeat page是否可以重复 默认true
 */
mvJsBridge.newWindow = function (options) {
  if (options.url) {
    if (platForms.isApp()) {
      let defaultOptions = {
        title: '',
        titleColor: '',
        hasBack: true,
        barColor: '',
        url: '',
        isLocal: false,
        opacity: 1,
        pullDown: false,
        toolsWay: [],
        navType: 1,
        barLoading: false,
        pageName: 'mvPage',
        pageIsRepeat: true
      }

      Object.assign(defaultOptions, options)
      mvJsBridge.callHandler('newWindow', defaultOptions)
    } else {
      window.location.href = options.url
    }
  } else {
    mvJsBridge.Alert('缺少打开的url')
  }
}

/**
 * 关闭窗口
 * @param {Object} options 参数
 * @param {String} options.step 返回窗口数，默认1
 */
mvJsBridge.closeWindow = function (options) {
  let defaultOptions = {
    step: 1
  }

  if (options) {
    if (typeof options == 'object') {
      Object.assign(defaultOptions, options)
    } else {
      defaultOptions.step = options
    }
  }
  if (platForms.isApp()) {
    mvJsBridge.callHandler('closeWindow', defaultOptions)
  } else {
    window.history.back(defaultOptions.step)
  }
}

/**
 * 注册下拉刷新回调
 * @param {Function} callback 回调函数
 */
mvJsBridge.registerPullDown = function (callback) {
  mvJsBridge.registerHandler('pullDown', callback)
}

/**
 * 注册返回键
 */
mvJsBridge.registerBack = function () {
  mvJsBridge.callHandler('registerBack')
}

/**
 * 触发返回键回调
 * @param {Function} callback 回调函数
 */
mvJsBridge.registerCallBack = function (callback) {
  mvJsBridge.registerHandler('callBack', callback)
}

/**
 * 释放返回键
 */
mvJsBridge.releaseBack = function () {
  mvJsBridge.callHandler('releaseBack')
}

/**
 * 获取缓存大小
 * @param {Function} callback 回调函数
 */
mvJsBridge.cacheSize = function (callback) {
  mvJsBridge.callHandler('cacheSize', {}, callback)
}

/**
 * 清除缓存
 * @param {Function} callback 回调函数
 */
mvJsBridge.clearCache = function (callback) {
  mvJsBridge.callHandler('clearCache', {}, callback)
}

//判断原生桥函数是否加载完成
let initJsBridge = function () {
  WebViewJavascriptBridgeReady = true
  window.WebViewJavascriptBridge.init(function (message, responseCallback) {
    if (typeof message != 'object') {
      message = JSON.parse(message)
    }
    if (!!message.call && mvJsBridge.messageCallBack[message.call]) {
      return responseCallback(mvJsBridge.messageCallBack[message.call](message) || '')
    }
  })
}

if (platForms.isApp()) {
  if (window.WebViewJavascriptBridge) {
    initJsBridge() //初始化内部通知
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        initJsBridge() //初始化内部通知
        handlerMap.forEach(function (v) {
          if (v.type == 'registerHandler') {
            mvJsBridge.registerHandler(v.name, v.callback)
          } else if (v.type == 'callHandler') {
            mvJsBridge.callHandler(v.name, v.data, v.callback)
          } else if (v.type == 'send') {
            mvJsBridge.send(v.data, v.callback)
          }
        })
      },
      false
    )
  }
}

export default mvJsBridge
