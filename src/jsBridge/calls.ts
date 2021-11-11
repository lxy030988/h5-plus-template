import { callHandler } from './WebViewJavascriptBridge'

/**
 * 关闭窗口
 * @param options
 */
export const closeWindow = (options = {}) => {
  const defaultOptions = {
    step: 1
  }

  // if (options) {
  //   if (typeof options == 'object') {
  //     Object.assign(defaultOptions, options)
  //   } else {
  //     defaultOptions.step = options
  //   }
  // }
  callHandler('closeWindow', defaultOptions)
  // if (platForms.isApp()) {
  // } else {
  //   window.history.back(defaultOptions.step)
  // }
}

/**
 * 指定页面发送消息
 * @param {Object} params 发送数据
 * @param {Object} params.data 传输的数据
 * @param {Array} params.names 发送的page name数组
 */
// mvJsBridge.sendToPage = function (params = {}) {
//   mvJsBridge.callHandler('informWebView', params)
// }

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
// mvJsBridge.newWindow = function (options) {
//   if (options.url) {
//     if (platForms.isApp()) {
//       let defaultOptions = {
//         title: '',
//         titleColor: '',
//         hasBack: true,
//         barColor: '',
//         url: '',
//         isLocal: false,
//         opacity: 1,
//         pullDown: false,
//         toolsWay: [],
//         navType: 1,
//         barLoading: false,
//         pageName: 'mvPage',
//         pageIsRepeat: true
//       }

//       Object.assign(defaultOptions, options)
//       mvJsBridge.callHandler('newWindow', defaultOptions)
//     } else {
//       window.location.href = options.url
//     }
//   } else {
//     mvJsBridge.Alert('缺少打开的url')
//   }
// }

/**
 * 注册返回键
 */
// mvJsBridge.registerBack = function () {
//   mvJsBridge.callHandler('registerBack')
// }

/**
 * 释放返回键
 */
// mvJsBridge.releaseBack = function () {
//   mvJsBridge.callHandler('releaseBack')
// }

/**
 * 获取缓存大小
 * @param {Function} callback 回调函数
 */
// mvJsBridge.cacheSize = function (callback) {
//   mvJsBridge.callHandler('cacheSize', {}, callback)
// }

/**
 * 清除缓存
 * @param {Function} callback 回调函数
 */
// mvJsBridge.clearCache = function (callback) {
//   mvJsBridge.callHandler('clearCache', {}, callback)
// }
