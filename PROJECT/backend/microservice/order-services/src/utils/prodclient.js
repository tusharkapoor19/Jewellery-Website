const axios = require("axios");




const prodclient = axios.create({
    baseURL: "http://localhost:5002/product"
});



module.exports = prodclient;