import { registerHandler } from './WebViewJavascriptBridge'

/**
 * 注册下拉刷新回调
 * @param callback
 */
export const registerPullDown = (callback: Function) => {
  registerHandler('pullDown', callback)
}

/**
 * 触发返回键回调
 * @param {Function} callback 回调函数
 */
// mvJsBridge.registerCallBack = function (callback) {
//   mvJsBridge.registerHandler('callBack', callback)
// }
