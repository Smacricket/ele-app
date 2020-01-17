module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 短信验证接口
      "/other": {
        target: "https://ele-interface.herokuapp.com/api/",
        // target: "http://114.116.245.197:5000/api/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/other": ""
        }
      },
      "/api": {
        target: "http://114.116.245.197:5000/api/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    before: app => {}
  }
};
