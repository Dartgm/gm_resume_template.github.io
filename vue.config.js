module.exports = {
  outputDir: 'docs', //build输出目录
  publicPath: './', //相对路径
  productionSourceMap: false,
  assetsDir: 'assets', //静态资源目录
  lintOnSave: false, //是否开启eslint
  devServer: {
    port: 8080, //端口
  },
  lintOnSave: false,
  chainWebpack(config) {
    config.plugin('html').tap((args) => { //标题
      args[0].title = '简历物料市场';
      return args;
    })
  }
}