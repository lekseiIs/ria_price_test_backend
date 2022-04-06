require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const fetch = require('node-fetch');
const { grupsData } = require('./database/index');
const { urlGenerator, selectsForm, selectsModels, getById, getDbData } = require('./utils/index');

const router = new Router();

app
  .use(bodyParser({ multipart: true }))
  .use(cors({ origin: '*' }))
  .use(router.routes())
  .use(router.allowedMethods());

router.post('/avg-price', async (ctx) => {
  try {
    const dbRequest = await getDbData(ctx.request.body)

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
  const { id: autoId } = ctx.query;

  try {
    await getById(autoId).then( async result => {
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
          custom
        }
      } = result

      const bodyForAvgPrice = {
        body_id: bodyId.toString(),
        marka_id: markId.toString(),
        model_id: modelId.toString(),
        yers: year.toString(),
        raceInt: [ raceInt.toString(), "999" ],
      }

      const dbRequest = await getDbData(bodyForAvgPrice)
  
      await fetch(urlGenerator(bodyForAvgPrice))
      .then((data) => data.json())
      .then((apiRequest) => {
        ctx.body = {message: "ok", data: {
          ...bodyForAvgPrice,
          gear_id: gearBoxId?.toString(),
          state_id: stateId?.toString(),
          damage: damage?.toString(),
          custom: custom?.toString(),
          fuel_id: fuelId?.toString(),
          photo: seoLinkM,
          markName: markName?.toString(),
          modelName: modelName?.toString(),
          USD: USD?.toString(),
          apiRequest,
          dbRequest
        }}
      })
    })
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
