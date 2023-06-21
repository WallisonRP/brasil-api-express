const filePath = './data.json';
const bodyParser = require('body-parser');
const fs = require('fs');
const distribuidor = require("express").Router();


distribuidor.use(bodyParser.json());
distribuidor.use(bodyParser.urlencoded({ extended: true }));


distribuidor.get('/estado/:sigla', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro interno do servidor');
      } else {
        const json = JSON.parse(data);
        const sigla = req.params.sigla;
        const estado = json[sigla];
        if (estado) {
          res.json(estado);
        } else {
          res.status(404).send('Estado não encontrado');
        }
      }
    });
  });

module.exports = distribuidor;