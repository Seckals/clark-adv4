module.exports = {
    productionSourceMap:false,
    publicPath:'./',
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