const axios = require("axios");

/*
 * NOTE: the order-service mounts its router at "/orders"
 * (plural) — see backend/microservice/order-services/src/app.js.
 * This previously pointed at "/order" (singular), which meant
 * any request through this client would 404 against the real
 * service.
 */
const orderClient = axios.create({
    baseURL: "http://localhost:5003/orders"
});

module.exports = orderClient;