module.exports = {
  // configureWebpack: (config) => {
  //   config.devtool = 'source-map'
  // },
  configureWebpack: {
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
  publicPath: './',
  devServer: {
    proxy: {
      '/md': {
        target: 'http://49.235.30.187:9001/md', // 后端服务器
        secure: false,
        changeOrigin: false,
        pathRewrite: {
          '^/md/': ''
        }
      }
    }
  }
}