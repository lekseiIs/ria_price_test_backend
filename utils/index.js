const urlGenerator = require('./urlGenerator');
const months = require('./monthName');
const { selectsForm, selectsModels, getById } = require('./selectsForm')
const sqlGenerator = require('./sqlGenerator');
const getDbData = require('./dbRequest')

module.exports = {
  urlGenerator, 
  sqlGenerator,
  months,
  selectsForm,
  selectsModels,
  getById,
  getDbData
};