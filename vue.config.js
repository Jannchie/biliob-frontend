const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
  // chainWebpack: config => {
  //   config.optimization.minimize(true);//进行代码压缩
  // },

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  runtimeCompiler: true,
  lintOnSave: false,
  // 简单Gzip
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 1024,
        minRatio: 0.8,
      }),
    ],
    entry: {
      app: ["babel-polyfill", "@/main.js"],
    },
  },
  pwa: {
    themeColor: "#333",
    name: "BiliOB233",
    msTileColor: "#333",
    workboxPluginMode: "InjectManifest",
    importWorkboxFrom: "disabled",
    importScripts: "https://cdn.myun.info/workbox-v4.3.1/workbox-sw.js",
    workboxOptions: {
      swSrc: "src/service-worker.js",
      exclude: ["index.html"],
    },
  },
  transpileDependencies: [
    "vue-echarts",
    "bresize-detector",
    "vuetify",
    "resize-detector",
  ],
};
