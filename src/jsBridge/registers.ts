import { registerHandler } from './WebViewJavascriptBridge'

/**
 * 注册下拉刷新回调
 * @param callback
 */
export const registerPullDown = (callback: Function) => {
  registerHandler('pullDown', callback)
}

/**
 * 注册返回键回调
 * @param callback
 */
export const registerCallBack = (callback: Function) => {
  registerHandler('callBack', callback)
}
