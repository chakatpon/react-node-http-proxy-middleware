var express = require("express");
var os = require("os");
var { createProxyMiddleware } = require("http-proxy-middleware");

var app = express();
var router = express.Router();

/* router.use('/AffiliateCampaigns', function(req, res, next) {
    // ... maybe some additional /bar logging ...
    next();
  }); */

/**
 * Configure proxy middleware
 */
const jsonPlaceholderProxy = createProxyMiddleware({
  target: "http://localhost:8080",
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  logLevel: "debug",
  pathRewrite: { "^/AffiliateCampaigns": "" }
});

app.use("/AffiliateCampaigns", jsonPlaceholderProxy);
app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
