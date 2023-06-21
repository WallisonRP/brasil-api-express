//routing for local development server (devServer.js)

const routes = require("express").Router();

const estados = require("./distribuidores");
const estado = require("./distribuidor");
const distribuidorPost = require("./distribuidorPost");
const distribuidorPut = require("./distribuidorPut");
const distribuidorDelete = require("./distribuidorDelete");


routes.use("/", estados);
routes.use("/", estado);
routes.use("/", distribuidorPost);
routes.use("/", distribuidorPut);
routes.use("/", distribuidorDelete);

module.exports = routes;
