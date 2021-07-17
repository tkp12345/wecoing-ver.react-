const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
 //프록시 설정
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
