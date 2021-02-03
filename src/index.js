const express = require('express');
const cors = require('cors');
const shell = require('shelljs');
const { request } = require('express');

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
* Tipos de parâmetros:
* 
* Query Params: Filtros e paginação
* Route Params: Identificar recursos (Atualizar/Deletar)
* Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
*/

/**
 * Middleware:
 * 
 * Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição.
 */

// function logRequests(request, response, next) {
//   const { method, url } = request;

//   /**
//    * O método "toUppercase" precisa ser chamado sem os parênteses para que não 
//    * apresente erro no insomnia, por exemplo
//    * 
//    * Antes:
//    * const logLabel = `[${method.toUppercase()} ${url}]`;
//    * 
//    * Depois:
//    * const logLabel = `[${method.toUppercase} ${url}]`;
//    */
  
//   const logLabel = `[${method.toUppercase} ${url}]`;

//   console.time(logLabel);

//   next(); // Próximo middleware

//   console.timeEnd(logLabel);
// }
//app.use(logRequests);

let path = '';
let featureName = '';
let currentBranch = '';

// ROUTES
// git.post('/changeBranch', (request, response) => {
//   currentBranch = request.body.branchName;
//   shell.exec(`git checkout ${currentBranch}`);

//   return response.json();
// });

app.post('/changePath', (request, response) => {   
  path = request.body.path; //path = path.concat('\\.git');
  shell.cd(path);

  return response.json(shell.ls());
});

app.post('/newFeature', (request, response) => {
  currentBranch = request.body.featureName;   
  shell.exec('git pull');
  shell.exec(`git checkout -b ${currentBranch}`);

  return response.json();
});

app.post('/sendChanges', (request, response) => {
  const commitMessage = request.body.commitMessage;  
  
  shell.exec('git add -A');
  shell.exec(`git commit -m "${commitMessage}"`);
  shell.exec(`git push --set-upstream origin ${currentBranch}`);
  //delete branch local
  //pull request via CLI ou CI server pipipi popopo 
  
  return response.json();
});
// ROUTES


app.listen(3333, () => {
  console.log('🚀 Back-end started')
});
