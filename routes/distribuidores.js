const filePath = './data.json';
const bodyParser = require('body-parser');
const fs = require('fs');
const distribuidores = require("express").Router();


distribuidores.use(bodyParser.json());
distribuidores.use(bodyParser.urlencoded({ extended: true }));


distribuidores.get('/estado', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro interno do servidor');
      } else {
        const json = JSON.parse(data);
        res.json(json)
        
      }
    });
  });

module.exports = distribuidores;