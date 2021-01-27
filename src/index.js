const express = require('express');
const cors = require('cors');
const shell = require('shelljs');

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

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  /**
   * O método "toUppercase" precisa ser chamado sem os parênteses para que não 
   * apresente erro no insomnia, por exemplo
   * 
   * Antes:
   * const logLabel = `[${method.toUppercase()} ${url}]`;
   * 
   * Depois:
   * const logLabel = `[${method.toUppercase} ${url}]`;
   */
  
  const logLabel = `[${method.toUppercase} ${url}]`;

  console.time(logLabel);

  next(); // Próximo middleware

  console.timeEnd(logLabel);
}

app.use(logRequests);



// ROUTES
app.get('/test', (request, response) => { 
  
  shell.exec('gh help');


  return response.json();
});
// ROUTES


app.listen(3333, () => {
  console.log('🚀 Back-end started')
});
