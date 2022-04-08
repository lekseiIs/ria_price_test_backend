const urlGenerator = require('./urlGenerator');
const months = require('./monthName');
const { getMarks, getRegions, getGearboxes, getFuelType, getBodyType, getModels, getById } = require('./selectsForm')
const sqlGenerator = require('./sqlGenerator');

module.exports = {
  urlGenerator, 
  sqlGenerator,
  months,
  getMarks,
  getRegions,
  getGearboxes,
  getFuelType,
  getBodyType,
  getModels,
  getById,
};