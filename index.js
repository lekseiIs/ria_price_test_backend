require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const fetch = require('node-fetch');
const { db, grupsData } = require('./database/index');
const { urlGenerator, months, sqlGenerator, getMarks, getRegions, getGearboxes, getFuelType, getBodyType,  getModels, getById } = require('./utils/index');
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

    // if(dbRequest.labels.length === 0){
      // throw new Error({message: "Invalid value"})
    // }


      await fetch(urlGenerator(ctx.request.body))
      .then((data) => data.json())
      .then((apiRequest) => {
        ctx.body = { message: "ok", apiRequest, dbRequest };
      })

  } catch (error) {
    ctx.body = {message: "error", data: {}}
  }
});

router.get('/get-marks', async (ctx) => {
  try {
    await getMarks().then(data => {
      ctx.body = {message: "ok", data}
    })
  } catch (error) {
    ctx.body = {message: "ok", data: []};
  }
});

router.get('/get-regions', async (ctx) => {
  try {
    await getRegions().then(data => {
      ctx.body = {message: "ok", data}
    })
  } catch (error) {
    ctx.body = {message: "ok", data: []};
  }
});

router.get('/get-gearboxes', async (ctx) => {
  try {
    await getGearboxes().then(data => {
      ctx.body = {message: "ok", data}
    })
  } catch (error) {
    ctx.body = {message: "ok", data: []};
  }
});

router.get('/get-fuel-type', async (ctx) => {
  try {
    await getFuelType().then(data => {
      ctx.body = {message: "ok", data}
    })
  } catch (error) {
    ctx.body = {message: "ok", data: []};
  }
});

router.get('/get-body-type', async (ctx) => {
  try {
    await getBodyType().then(data => {
      ctx.body = {message: "ok", data}
    })
  } catch (error) {
    ctx.body = {message: "ok", data: []};
  }
});

// router.get('/selects-form', async (ctx) => {
//   try {
//     await selectsForm().then(data => {
//       const grupsObj = grupsData(data)
//       ctx.body = {message: "ok", data: grupsObj}
//     })
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get('/get-models/:markaId', async (ctx) => {
  const markaId = ctx.params.markaId
  try {
    await getModels(markaId).then(data => {
      if(data.length === 0) {
        throw new Error
      }
      ctx.body = {message: "ok", data}
    })
  } catch (error) {
    ctx.body = {message: "error", data: {}}
  }
});

router.get('/ad/info', async (ctx) => {
  const { id: autoId } = ctx.query;

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
          autoId,
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
        autoId,
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
        raceFrom: "5",
        raceTo: "1000",
        categoryId
      }}
    })
  } catch (error) {
    ctx.body = {message: "error", data: {}}
  }
});

app.listen(3000);
