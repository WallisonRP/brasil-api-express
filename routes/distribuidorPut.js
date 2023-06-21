const filePath = './data.json';
const bodyParser = require('body-parser');
const fs = require('fs');
const distribuidorPut = require("express").Router();


distribuidorPut.use(bodyParser.json());
distribuidorPut.use(bodyParser.urlencoded({ extended: true }));


  distribuidorPut.put('/estado/:sigla/distribuidor/:id', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro interno do servidor');
      } else {
        const json = JSON.parse(data);
        const sigla = req.params.sigla;
        const id = req.params.id;
        const distribuidor = req.body;
        const estado = json[sigla];
        if (estado) {
          const distribuidores = estado.distribuidores;
          const distribuidorIndex = distribuidores.findIndex(d => d.id == id);
          if (distribuidorIndex !== -1) {
            distribuidores[distribuidorIndex] = { ...distribuidores[distribuidorIndex], ...distribuidor };
            fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', (err) => {
              if (err) {
                console.error(err);
                res.status(500).send('Erro interno do servidor');
              } else {
                res.send('Distribuidor atualizado com sucesso');
              }
            });
          } else {
            res.status(404).send('Distribuidor não encontrado');
          }
        } else {
          res.status(404).send('Estado não encontrado');
        }
      }
    });
  });

module.exports = distribuidorPut;