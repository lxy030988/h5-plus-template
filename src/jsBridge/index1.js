/**
 * mvJsBride 入口
 */
import mvJsBridge from './mvJsBridge'
import { platForms } from '@/libs/util'
import Alert from '@/components/Alert'
import Loading from '@/components/Loading'
import Confirm from '@/components/Confirm'

/**
 * alert
 * @param {String} message alert消息
 */
mvJsBridge.Alert = function (message) {
  if (platForms.isApp()) {
    mvJsBridge.callHandler('toast', message)
  } else {
    Alert(message)
  }
}
/**
 * loading
 */
mvJsBridge.Loading = {
  show() {
    return Loading.show()
  },
  hide() {
    Loading.hide()
  }
}
/**
 * confirm
 * @param {Object} options 弹出confirm参数
 * @param {String} options.title confirm标题 默认 '提醒'
 * @param {String} options.content confirm内容 默认 '这里是confirm content'
 * @param {String} options.cancelText 取消按钮文本 默认 '取消' 为空则不显示
 * @param {String} options.okText 确认按钮文本 默认 '确定'
 * @param {Boolean} options.autoClose 是否自动关闭，默认true
 * @param {Boolean} options.maskClose 点击背景层是否自动关闭，默认true
 * @param {Function} options.okCallBack 成功的回调
 * @param {Function} options.cancelCallBack 失败的回调
 * @returns {Object} vue vm对象
 */
mvJsBridge.Confirm = function (options) {
  return Confirm(options)
}

/**
 * 登录成功通知
 * @param {Object} data 参数
 */
mvJsBridge.LoginSuccess = function (data) {
  mvJsBridge.send({ call: 'loginSuccess' })
  mvJsBridge.callHandler('loginSuccess', data)
}
/**
 * 成功的回调
 * @param {Function} callback 回调函数
 */
mvJsBridge.registerLoginSuccess = function (callback) {
  mvJsBridge.messageCallBack.loginSuccess = callback
}

/**
 * 获取设备信息
 * @param {Function} callback 回调
 */
mvJsBridge.getDeviceInfo = function (callback) {
  mvJsBridge.callHandler('deviceInfo', null, callback)
}

//挂载到window上，全局可用，方便测试
window.mvJsBridge = mvJsBridge
export default mvJsBridge
