const { db } = require('./index');

module.exports = {
  selectAvgData: async (select) => {
    return new Promise((resolve, reject) => {
      db.query(select, (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
      });
    });
  },
};
