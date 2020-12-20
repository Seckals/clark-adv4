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
    devtool: 'source-map',
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
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