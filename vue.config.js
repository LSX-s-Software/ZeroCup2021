// 引入等比适配插件
const px2rem = require("postcss-px2rem");

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16,
});

const path = require("path");

// 使用等比适配插件
module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [postcss],
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/ZeroCup2021" : "/",
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@img": path.resolve(__dirname, "./src/assets/img"),
        "@video": path.resolve(__dirname, "./src/assets/video"),
      },
    },
  },
};
