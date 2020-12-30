// const name = process.env.VUE_APP_NAME || 'Inalfa Digita Factory';

// vue.config.js
// 引入
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV != 'development') {
      // js,css代码的最小化压缩
      config.optimization.minimize(true);
    }
  },
  configureWebpack: (config) => {
    // if (process.env.NODE_ENV != 'development') {
    //   config.optimization.minimizer = [
    //     new UglifyJsPlugin({
    //       uglifyOptions: {
    //         warnings: false,
    //         compress: {
    //           drop_console: true,
    //           drop_debugger: false,
    //           pure_funcs: ["console.log"]
    //         }
    //       }
    //     })
    //   ];
    // }
    config.devtool = 'source-map'
  },
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    port: "8081",
    proxy: {
      '/auth': {
        target: 'http://49.235.30.187:9000/auth', // 后端服务器
        secure: false,
        changeOrigin: false,
        pathRewrite: {
          '^/auth/': ''
        }
      }
    }
  }
}