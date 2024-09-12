const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const users = require("./users");
const { resourcesCode } = require("../mysql/sql");
const { uploadPicture } = require("../utils/upload");

const cors = require('koa2-cors'); //跨域处理
app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            if (ctx.url === '/test') {
                return '*'; // 允许来自所有域名请求
            }
            return 'http://localhost:3000'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
// 使用cors中间件
app.use(cors());
router.post("/upload", async (ctx, next) => {
  let { id } = ctx.query;
  let result = await uploadPicture(ctx, { pictureType: "img" });

  // const res = await resourcesCode.create();
  // ctx.body = list.code_content;
  ctx.body = result;
});

app.use(users.routes(), users.allowedMethods());
app.use(router.routes(), router.allowedMethods());
module.exports = app;
