export const platForms = {
  ua: window.navigator.userAgent,

  /**
   * 判断平台
   * @param type
   * @returns
   */
  is(type: string) {
    type = type.toLowerCase()
    return this.ua.toLowerCase().indexOf(type) >= 0
  },
  isMobile() {
    return !!this.ua.match(/(iPhone|iPod|Android|ios)/i)
  },
  isIOS() {
    return !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  },
  isIPad() {
    return this.is('ipad')
  },
  isiPhone() {
    return this.is('iPhone')
  },
  isAndroid() {
    return this.is('android') || this.is('Linux')
  },
  isWindowsPhone() {
    return this.is('Windows Phone')
  },
  isWx() {
    return this.is('micromessenger')
  },
  isApp() {
    return this.is('minivision')
  }
}
