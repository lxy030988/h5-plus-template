import { platForms } from '../platForms'
import { callHandler } from '../WebViewJavascriptBridge'
import { TNewWindowOptions, TSendToPageParams } from './model'

/**
 * 关闭窗口
 * @param options
 */
export const closeWindow = (options: number | {}, callback?: Function) => {
  if (platForms.isApp()) {
    const defaultOptions = {
      step: 1
    }

    if (options) {
      if (typeof options == 'number') {
        defaultOptions.step = options
      } else if (typeof options == 'object') {
        Object.assign(defaultOptions, options)
      }
    }
    callHandler('closeWindow', defaultOptions, callback)
  } else {
    window.history.back()
  }
}

/**
 * 注册返回键
 */
export const registerBack = () => {
  callHandler('registerBack')
}

/**
 * 释放返回键
 */
export const releaseBack = () => {
  callHandler('releaseBack')
}

/**
 * 获取缓存大小
 * @param callback
 */
export const getCacheSize = (callback?: Function) => {
  callHandler('cacheSize', {}, callback)
}

/**
 * 清除缓存
 * @param callback
 */
export const clearCache = (callback?: Function) => {
  callHandler('clearCache', {}, callback)
}

/**
 * 指定页面发送消息
 * @param params
 */
export const sendToPage = (params: TSendToPageParams) => {
  callHandler('informWebView', params)
}

/**
 * 打开新窗口
 * @param options
 * @param callback
 */
export const openWindow = (options: TNewWindowOptions, callback?: Function) => {
  if (platForms.isApp()) {
    const defaultOptions: TNewWindowOptions = {
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
    callHandler('newWindow', defaultOptions, callback)
  } else {
    window.location.href = options.url
  }
}
