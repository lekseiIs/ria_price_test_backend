const fetch = require('node-fetch');

const api_key = process.env.API_KEY

const urls = [
    `https://api.auto.ria.com/categories/1/marks?api_key=${api_key}&langId=4`,
    `https://developers.ria.com/auto/categories/1/bodystyles?api_key=${api_key}&langId=4`,
    `https://developers.ria.com/auto/states?api_key=${api_key}&langId=4`,
    `https://developers.ria.com/auto/categories/1/gearboxes?api_key=${api_key}&langId=4`,
    `https://developers.ria.com/auto/type?api_key=${api_key}&langId=4`,
];



module.exports = {
    selectsForm: () => {
        let requests = urls.map(url => fetch(url));
    
        return Promise.all(requests)
        .then(responses => responses)
        .then(responses => Promise.all(responses.map(r => r.json())))
    },

    selectsModels: async (markaId) => {
        const modelsUrl = `https://api.auto.ria.com/categories/1/marks/${markaId}/models?api_key=${api_key}&langId=4`

        return await fetch(modelsUrl)
        .then((response) => {
            return response.json();
        })
    },

    getById: async (autoId) => {
        const url = `https://developers.ria.com/auto/info?api_key=${api_key}&auto_id=${autoId}`

        return await fetch(url)
        .then((response) => {
            return response.json();
        })
    },

}