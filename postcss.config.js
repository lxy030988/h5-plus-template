module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      // Vant 官方根字体大小是 37.5
      rootValue: 37.5,
      // rootValue({ file }) {
      //   return file.indexOf('/vant') !== -1 ? 37.5 : 75
      // },
      propList: ['*']
      // selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}
