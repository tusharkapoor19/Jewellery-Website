const axios = require("axios");

const orderClient = axios.create({
    baseURL: "http://localhost:5003/order"
});

module.exports = orderClient;