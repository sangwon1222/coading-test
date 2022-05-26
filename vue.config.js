const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 1234,
    client: {
      webSocketURL: 'ws://0.0.0.0:1234/ws',
    },
    allowedHosts: 'all',
  },
  transpileDependencies: true,
})
