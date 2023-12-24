const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'https://web.aiapp.gg',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
      }
     }
  },
  transpileDependencies: true,
  configureWebpack: {
    experiments: {
      asyncWebAssembly: true
    }
  }
})
