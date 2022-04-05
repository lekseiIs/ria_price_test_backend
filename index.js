require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const fetch = require('node-fetch');
const { db, grupsData } = require('./database/index');
const { urlGenerator, months, sqlGenerator, selectsForm, selectsModels, getById } = require('./utils/index');
const { selectAvgData } = require('./database/dbMethods');

const router = new Router();

app
  .use(bodyParser({ multipart: true }))
  .use(cors({ origin: '*' }))
  .use(router.routes())
  .use(router.allowedMethods());

router.post('/avg-price', async (ctx) => {
  try {
    const selectQuery = sqlGenerator(ctx.request.body)
    const data = await selectAvgData(selectQuery)

    const dbRequest = data.reduce(
      (acc, curr) => {
        acc.labels.push(months[curr.month] + `(${curr.year})`);
        acc.nums.push(Number(curr.avg).toFixed());
        return acc;
      },
      { labels: [], nums: [] }
    );

      await fetch(urlGenerator(ctx.request.body))
      .then((data) => data.json())
      .then((apiRequest) => {
        ctx.body = { message: "ok", apiRequest, dbRequest };
      })

  } catch (error) {
    console.log(error);
  }
});

router.get('/selects-form', async (ctx) => {
  try {
    await selectsForm().then(data => {
      const grupsObj = grupsData(data)
      ctx.body = {message: "ok", data: grupsObj}
    })
  } catch (error) {
    console.log(error);
  }
});

router.get('/get-models/:markaId', async (ctx) => {
  const markaId = ctx.params.markaId
  try {
    await selectsModels(markaId).then(data => {
      ctx.body = {message: "ok", data}
    })
  } catch (error) {
    console.log(error);
  }
});

router.get('/ad/info', async (ctx) => {
  // const autoId = ctx.params.id
  const { id: autoId } = ctx.query;
  // console.log(id);

  try {
    await getById(autoId).then(result => {
      const {
        photoData: { seoLinkM },
        USD,
        markName,
        modelName,
        markId,
        modelId,
        autoInfoBar: { damage },
        stateData: { stateId },
        autoData: {
          year,
          bodyId,
          raceInt,
          fuelId,
          gearBoxId,
          categoryId,
          custom
        }
      } = result

      ctx.body = {message: "ok", data: {
        body_id: bodyId,
        marka_id: markId,
        model_id: modelId,
        yers: year,
        state_id: stateId,
        damage,
        custom,
        gear_id: gearBoxId,
        fuel_id: fuelId,
        photo: seoLinkM,
        markName,
        modelName,
        USD,
        raceInt,
        categoryId
      }}
    })
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
