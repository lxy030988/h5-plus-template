import { init } from './WebViewJavascriptBridge'
import { platForms } from './platForms'
console.log('platForm', platForms.ua)
if (platForms.isApp()) {
  if (window.WebViewJavascriptBridge) {
    init()
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', init, false)
  }
}
