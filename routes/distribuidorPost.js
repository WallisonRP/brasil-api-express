const filePath = './data.json';
const bodyParser = require('body-parser');
const fs = require('fs');
const distribuidorPost = require("express").Router();


distribuidorPost.use(bodyParser.json());
distribuidorPost.use(bodyParser.urlencoded({ extended: true }));


  distribuidorPost.post('/estado/:sigla/distribuidor', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro interno do servidor');
      } else {
        const json = JSON.parse(data);
        const sigla = req.params.sigla;
        const distribuidor = req.body;
        const estado = json[sigla];
        if (estado) {
          estado.distribuidores.push(distribuidor);
          fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', (err) => {
            if (err) {
              console.error(err);
              res.status(500).send('Erro interno do servidor');
            } else {
              res.send('Distribuidor adicionado com sucesso');
            }
          });
        } else {
          res.status(404).send('Estado não encontrado');
        }
      }
    });
  });

module.exports = distribuidorPost;