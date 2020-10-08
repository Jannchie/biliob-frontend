const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {

  chainWebpack: config => {
    config.optimization.minimize(true);//进行代码压缩
  },

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  lintOnSave: false,
  // 简单Gzip 
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 1024,
        minRatio: 0.8
      })
    ],
    entry: {
      app: ["babel-polyfill", "@/main.js"]
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
