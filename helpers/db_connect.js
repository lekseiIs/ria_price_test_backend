let { createPool } = require('mysql');

let pool = createPool({
    host: "213.95.148.64",
    port: "33306",
    user: "karpishen.serhii",
    password: "b23GPnf6yPC4",
    connectionLimit: 10,
    database: "auto"
});


function ShowPrice(ctx) {
    pool.query('select avg(price), year(publication_date), month(publication_date), abroad from vehicle where date(publication_date) between DATE_SUB(CURDATE(), INTERVAL 12 MONTH) and DATE_SUB(CURDATE(), INTERVAL 0 MONTH)and model_id=586 and year=2013 and abroad=0 or abroad=1 group by year(publication_date), month(publication_date)',
        (err, result) => {
            if (err) {
                return console.log("error");
            }
            console.log(result);
            ctx.body = result;
        });
}
module.exports = {
    ShowPrice
};