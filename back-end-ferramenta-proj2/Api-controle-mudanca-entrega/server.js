const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//init do app
const app = express();
app.use(express.json());
app.use(cors());

//init do banco de dados
mongoose.connect(
  'mongodb://localhost:27017/nodeapi',
  { useNewUrlParser: true }
);

requireDir('./src/models');

//Rotas
app.use('/api', require('./src/routes'));

app.listen(3001);



/**
* Instale o Docker no seu SO
* Agora com o docker instalado, no terminal digite 'docker pull mong'o. Assim um container do mongoDB será instalado.
* Para inicializar o mongo, você deve redirecionar as portas através do comando 'docker run --name mongodb -p 27017:27017 -d mongo'
* Use o comando 'docker ps -a' para verificar se o container do mongo está rodando, caso não esteja basta digitar o comando 'docker start nomeDoContainer'


docker run --name mongodb-api-cme -p 27017:27017 -d mongo
*/