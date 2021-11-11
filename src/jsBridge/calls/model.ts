export interface TSendToPageParams {
  data: {} //传输的数据
  names: string[] //发送的page name数组
}

interface TToolsWay {
  icon: string //显示的图标，为空则显示文字
  text: string //为空则显示icon，默认显示icon
  name: string //回调的name名字
}
export enum NavTypes {
  NORMAL = 1, //常规
  GRADIENT = 2, //滑动渐变(opacity,fullView无效)
  NULL = 3 //无导航条
}
export interface TNewWindowOptions {
  url: string //必填，打开window的url
  isLocal: boolean //打开是否是本地的url,默认false
  pageName: string //必填,page的名称,默认 mvPage
  pageIsRepeat: boolean //page是否可以重复 默认true
  title: string //标题，可为空，为空则取 webview 的动态title
  titleColor: string //字体颜色，为空则为默认颜色
  hasBack: boolean //是否有返回按钮，默认true
  barColor: string //导航条颜色，为空则是默认颜色
  opacity: number //导航条透明度，0-1，默认1
  barLoading: boolean //导航条是否带进度条,默认false
  navType: NavTypes //导航条类型
  pullDown: boolean //是否有下拉刷新，默认false
  toolsWay: TToolsWay[] //工具栏
}
