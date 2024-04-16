const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const users = require("./users");
const { resourcesCode } = require("../mysql/sql");
// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());

router.get("/", async (ctx, next) => {
  let { id } = ctx.query;
  let list = await resourcesCode.findOne({
    where: {
      id, //id大于10的
    },
  });

  // const res = await resourcesCode.create();
  ctx.body = list.code_content;
});

app.use(users.routes(), users.allowedMethods());
app.use(router.routes(), router.allowedMethods());
module.exports = app;
