import { HandlerItem, HandlerTypes } from './model'

//原生插件库是否加载完成
let WebViewJavascriptBridgeReady = false

//用于存储事件桥未加载完成之前的事件列表
const handlerMap: HandlerItem[] = []

//内部透传事件列表
const messageCallBack = {}

/**
 * 注册方法，给原生调用
 * @param name
 * @param callback
 */
export const registerHandler = (name: string, callback: Function) => {
  if (WebViewJavascriptBridgeReady) {
    window.WebViewJavascriptBridge?.registerHandler(name, (resData: any, responseCallback: any) => {
      if (!!resData && typeof resData != 'object') {
        resData = JSON.parse(resData)
      }
      callback(resData, responseCallback)
    })
  } else {
    handlerMap.push({
      type: HandlerTypes.RegisterHandler,
      name,
      callback
    })
  }
}

/**
 * 调用原生方法
 * @param name
 * @param data 发送数据
 * @param callback
 */
export const callHandler = (name: string, data = {}, callback?: Function) => {
  if (WebViewJavascriptBridgeReady) {
    console.log('callHandler', name)
    window.WebViewJavascriptBridge?.callHandler(name, data, (resData: any) => {
      if (!!resData && typeof resData != 'object') {
        resData = JSON.parse(resData)
      }
      callback && callback(resData)
    })
  } else {
    handlerMap.push({
      type: HandlerTypes.CallHandler,
      name,
      data,
      callback
    })
  }
}

/**
 * 发送消息
 * @param data
 * @param callback
 */
export const send = (data = {}, callback?: Function) => {
  if (WebViewJavascriptBridgeReady) {
    window.WebViewJavascriptBridge?.send(data, (resData: any) => {
      if (!!resData && typeof resData != 'object') {
        resData = JSON.parse(resData)
      }
      callback && callback(resData)
    })
  } else {
    handlerMap.push({
      type: HandlerTypes.Send,
      data,
      callback
    })
  }
}

const HandlerTypeToFn = {
  [HandlerTypes.RegisterHandler]: registerHandler,
  [HandlerTypes.CallHandler]: callHandler,
  [HandlerTypes.Send]: send
}

/**
 * 初始化
 */
export const init = () => {
  WebViewJavascriptBridgeReady = true
  window.WebViewJavascriptBridge?.init(function (message: any, responseCallback: Function) {
    if (typeof message != 'object') {
      message = JSON.parse(message)
    }
    if (!!message.call && messageCallBack[message.call]) {
      return responseCallback(messageCallBack[message.call](message) || '')
    }
  })

  if (handlerMap.length) {
    handlerMap.forEach(item => {
      if (item.type === HandlerTypes.Send) {
        HandlerTypeToFn[item.type](item.data, item.callback)
      } else {
        HandlerTypeToFn[item.type](item.name!, item.callback!)
      }
    })
  }
}
