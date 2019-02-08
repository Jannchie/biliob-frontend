const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
  // 是否为生产环境构建生成 source map？
  productionSourceMap: true,

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
    ]
  },
  pwa: {
    themeColor: "#444",
    name: "BiliOB观测者",
    msTileColor: "#444"
  },
  transpileDependencies: [/\bvue-echarts\b/, /\bresize-detector\b/]
};
