const { createPool } = require('mysql2/promise');

const connection = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  connectionLimit: 10,
  database: process.env.DB_NAME,
});




module.exports = async (queryString) => {
    try {
      console.log()
      // Запит №2
      const [rows, fields] = await connection.query(queryString)
      // Запит №1
      // const [rows, fields] =  await connection.query('select avg(price) as avg, year(publication_date) as year, month(publication_date) as month, abroad from `vehicle` where date(publication_date) between DATE_SUB(CURDATE(), INTERVAL 12 MONTH) and DATE_SUB(CURDATE(), INTERVAL 0 MONTH)and `model_id` = ? and `year` = ? and abroad=0 or abroad=1 group by year(publication_date), month(publication_date)', [Number(model_id), Number(yers)]);
      return rows;
    } catch (error) {
      console.log(error)
    }
};

