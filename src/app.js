const onerror = require("koa-onerror");
const app = require("./routes/index");
const static = require("koa-static");
app.use(static(__dirname + "/.." + "/static")); // __dirname是当前文件夹
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
module.exports = app;
