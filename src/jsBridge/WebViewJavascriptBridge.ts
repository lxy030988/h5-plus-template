//原生插件库是否加载完成
let WebViewJavascriptBridgeReady = false

//用于存储事件桥未加载完成之前的事件列表
const handlerMap = []

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
      type: 'registerHandler',
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
      type: 'callHandler',
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
      type: 'send',
      data,
      callback
    })
  }
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

  //  handlerMap.forEach(function (v) {
  //    if (v.type == 'registerHandler') {
  //      mvJsBridge.registerHandler(v.name, v.callback)
  //    } else if (v.type == 'callHandler') {
  //      mvJsBridge.callHandler(v.name, v.data, v.callback)
  //    } else if (v.type == 'send') {
  //      mvJsBridge.send(v.data, v.callback)
  //    }
  //  })
}
