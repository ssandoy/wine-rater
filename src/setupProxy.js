const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/wine-api/", {
      target: "http://localhost:9000/",
      pathRewrite: {
        "^/\\wine-api": ""
      }
    })
  );
};
