module.exports = (body) => {

  require('dotenv').config();

const apiKey = process.env.API_KEY

  const url = 'https://developers.ria.com/auto/average_price?api_key=';

    const params = Object.entries(body).map((param) => {
      if (typeof param[1] === "string") {
        return param.join("=")
      } else {
        const key = param[0];
        const values = param[1];
        return values.map((param) => key + "=" + param).join("&");
      }
    }).join("&");
    return url + apiKey + "&" + params;
};