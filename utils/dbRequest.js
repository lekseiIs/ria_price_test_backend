const urlGenerator = require('./urlGenerator');
const months = require('./monthName');
const sqlGenerator = require('./sqlGenerator')
const { selectAvgData } = require('../database/dbMethods');
const fetch = require('node-fetch');



module.exports = async (body) => {
    const selectQuery = sqlGenerator(body)
    const data = await selectAvgData(selectQuery)

    const dbRequest = data.reduce(
      (acc, curr) => {
        acc.labels.push(months[curr.month] + `(${curr.year})`);
        acc.nums.push(Number(curr.avg).toFixed());
        return acc;
      },
      { labels: [], nums: [] }
    );
    return dbRequest
}