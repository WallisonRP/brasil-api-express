const filePath = './data.json';
const bodyParser = require('body-parser');
const fs = require('fs');
const app = require("../app");
const route = require("../routes/distribuidorPut");

app.use("/api/", route);

module.exports = app;
