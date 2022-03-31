require('dotenv').config();
const { createPool } = require('mysql');

const PASSWORD = process.env.DB_PWD
const USER = process.env.DB_USER
const PORT = process.env.DB_PORT
const HOST = process.env.DB_HOST

const pool = createPool({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    connectionLimit: 10,
    database: "auto"
});


module.exports = async (select) => {
      return new Promise((resolve, reject)=>{
        pool.query(select,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};