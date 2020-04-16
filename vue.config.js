const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 简单Gzip
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    entry: {
      app: ["babel-polyfill", "@/main.js"]
    },
    devServer: {
      proxy: {
        "/api": {
          target: "https://biliob.com/",
          changeOrigin: true, // target是域名的话，需要这个参数，
          secure: false // 设置支持https协议的代理
        }
      }
    }
  },
  pwa: {
    themeColor: "#333",
    name: "BiliOB观测者",
    msTileColor: "#333"
  },
  transpileDependencies: [
    "vue-echarts",
    "bresize-detector",
    "vuetify",
    "resize-detector"
  ]
};
