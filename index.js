const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('@koa/cors');



const router = new Router();

router.get('/test', async (ctx, next) => {
  const a = ctx.query;
  ctx.status = 200;
  ctx.set('Content-Type', 'application/json');
  ctx.body = {
    a: 1,
    b: 2
  }
});

app
  .use(cors({'Access-Control-Allow-Origin': '*'}))
  .use(router.routes())
  .use(router.allowedMethods());





app.listen(3000);