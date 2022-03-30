require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const fetch = require('node-fetch');
const { db } = require('./helpers/index');
const { urlGenerator, months, sqlParams } = require('./utils/index');

const router = new Router();

app
  .use(bodyParser({ multipart: true }))
  .use(cors({ origin: '*' }))
  .use(router.routes())
  .use(router.allowedMethods());

router.post('/avg-price', async (ctx) => {
  try {
    const dbRequest = await (await db(sqlParams(ctx.request.body))).reduce(
      (acc, curr) => {
        acc.labels.push(months[curr.month] + `(${curr.year})`);
        acc.nums.push(Number(curr.avg).toFixed());
        return acc;
      },
      { labels: [], nums: [] }
    );
    const apiRequest = await (await fetch(urlGenerator(ctx.request.body))).json();

    ctx.body = { apiRequest, dbRequest };
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
