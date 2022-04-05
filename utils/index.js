const urlGenerator = require('./urlGenerator');
const months = require('./monthName');
const { selectsForm, selectsModels, getById } = require('./selectsForm')
const sqlGenerator = require('./sqlGenerator');

module.exports = {
  urlGenerator, 
  sqlGenerator,
  months,
  selectsForm,
  selectsModels,
  getById,
};