const express = require('express');
const cors = require('cors');
const shell = require('shelljs');
const pathResolve = require('path'); 

const { request, response } = require('express');
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
// app.post('/changeBranch', (request, response) => {
//   currentBranch = request.body.branchName;
//   shell.exec(`git checkout ${currentBranch}`);

//   return response.json();
// });

// app.post('/deleteLocalBranch', (request, response) => {
//   //name = request.body.branchName;
//   //shell.exec(`git branch -D ${name}`);
  
//   //git branch -d currentBranch
//   //git branch -D currentBranch -> remove mesmo que nao haja commits

//   return response.json();
// });

app.get('/configRepo', (request, response) => {  
  shell.mkdir('.github');
  shell.cd('.github');

  shell.mkdir('workflows'); 
  shell.cd('workflows');

  const workflowFilesPath = pathResolve.join(__dirname, '..\\workflowFiles');
  const command = `copy ${workflowFilesPath} ${shell.dirs()}`;
  shell.exec(command);

  return response.json();
});

app.post('/clone', (request, response) => {
  shell.exec(`git clone ${request.body.repositoryUrl}`);  

  return response.json();
});

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
  shell.exec(`gh pr create --title "${commitMessage}" --body "pull request body" --label "automerge"`);

  return response.json();
});
// ROUTES

app.listen(3333, () => {
  console.log('🚀 Back-end started')
});

/**
 * TO-DO
 * verify git native merge
 * delete remote branch after auto-merge(repo configs) 
 */