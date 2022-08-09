module.exports = function(app) {
    app.use(
      createProxyMiddleware(["/api"], { target: "https://keysafer.herokuapp.com/" })
    );
  };