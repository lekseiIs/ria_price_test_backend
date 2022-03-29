const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const fetch = require('node-fetch');
const { urlGenerator } = require('./helpers/index');

const router = new Router();


app
  .use(bodyParser({ multipart: true }))
  .use(cors({ origin: '*' }))
  .use(router.routes())
  .use(router.allowedMethods());
router.post('/avg-price', async (ctx) => {
  await fetch(urlGenerator(ctx.request.body))
        .then((data) => data.json())
        .then((result) => ctx.body = result)
        .catch((e) => ctx.body = { error: e });
});

app.listen(3000);
