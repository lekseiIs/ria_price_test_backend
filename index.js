require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const fetch = require('node-fetch');
const { urlGenerator, db } = require('./helpers/index');

const router = new Router();


app
  .use(bodyParser({ multipart: true }))
  .use(cors({ origin: '*' }))
  .use(router.routes())
  .use(router.allowedMethods());

router.post('/avg-price',  async (ctx) => {
  try {
    const dbRequest = await db(ctx);
    const apiRequest =  await fetch(urlGenerator(ctx.request.body));
    const apiResult = await apiRequest.json();
    ctx.body = { apiResult, dbRequest };    
  } catch (error) {
    console.log(error)
  }
});

app.listen(3000);