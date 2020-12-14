const name = process.env.VUE_APP_NAME || 'Inalfa Digita Factory';

// vue.config.js
module.exports = {
  publicPath: './',

  configureWebpack: {
    // plugins: [
    //   // Ignore all locale files of moment.js
    //   new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    // ]
    name,
    devtool: 'source-map'
  },
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