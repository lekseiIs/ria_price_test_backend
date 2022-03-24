const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');



const router = new Router();

router.get('/test', (ctx, next) => {
  const a = ctx.query;
  console.log(a.a)
});

app
  .use(router.routes())
  .use(router.allowedMethods());





app.listen(3000);