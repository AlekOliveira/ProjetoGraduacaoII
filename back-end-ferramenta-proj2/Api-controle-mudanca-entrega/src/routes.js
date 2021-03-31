const express = require('express');
const routes = express.Router();
const ArquivoController = require('./controllers/ArquivoController');
const ClienteController = require('./controllers/ClienteController');
const FuncaoController = require('./controllers/FuncaoController');
const FuncaoSistemaController = require('./controllers/FuncaoSistemaController');
const MudancaController = require('./controllers/MudancaController');
const SistemaController = require('./controllers/SistemaController');
const StatusMudancaController = require('./controllers/StatusMudancaController');
const TipoMudancaController = require('./controllers/TipoMudancaController');
const UsuarioController = require('./controllers/UsuarioController');
const VAFSController = require('./controllers/VAFSController');
const VersaoArquivoController = require('./controllers/VersaoArquivoController');

routes.get('/arquivo',ArquivoController.index);
routes.get('/arquivo/:id',ArquivoController.show);
routes.post('/arquivo',ArquivoController.store);
routes.put('/arquivo/:id',ArquivoController.update);
routes.delete('/arquivo/:id',ArquivoController.remove);

routes.get('/cliente',ClienteController.index);
routes.get('/cliente/:id',ClienteController.show);
routes.post('/cliente',ClienteController.store);
routes.put('/cliente/:id',ClienteController.update);
routes.delete('/cliente/:id',ClienteController.remove);

routes.get('/funcao',FuncaoController.index);
routes.get('/funcao/:id',FuncaoController.show);
routes.post('/funcao',FuncaoController.store);
routes.put('/funcao/:id',FuncaoController.update);
routes.delete('/funcao/:id',FuncaoController.remove);

routes.get('/mudanca',MudancaController.index);
routes.get('/mudanca/:id',MudancaController.show);
routes.post('/mudanca',MudancaController.store);
routes.put('/mudanca/:id',MudancaController.update);
routes.delete('/mudanca/:id',MudancaController.remove);

routes.get('/sistema',SistemaController.index);
routes.get('/sistema/:id',SistemaController.show);
routes.post('/sistema',SistemaController.store);
routes.put('/sistema/:id',SistemaController.update);
routes.delete('/sistema/:id',SistemaController.remove);

routes.get('/tipomudanca',TipoMudancaController.index);
routes.get('/tipomudanca/:id',TipoMudancaController.show);
routes.post('/tipomudanca',TipoMudancaController.store);
routes.put('/tipomudanca/:id',TipoMudancaController.update);
routes.delete('/tipomudanca/:id',TipoMudancaController.remove);

routes.get('/usuario',UsuarioController.index);
routes.get('/usuario/:id',UsuarioController.show);
routes.post('/usuario',UsuarioController.store);
routes.put('/usuario/:id',UsuarioController.update);
routes.delete('/usuario/:id',UsuarioController.remove);

routes.get('/versao',VersaoArquivoController.index);
routes.get('/versao/:id',VersaoArquivoController.show);
routes.post('/versao',VersaoArquivoController.store);
routes.put('/versao/:id',VersaoArquivoController.update);
routes.delete('/versao/:id',VersaoArquivoController.remove);

routes.get('/funcaosistema',FuncaoSistemaController.index);
routes.get('/funcaosistema/:id',FuncaoSistemaController.show);
routes.post('/funcaosistema',FuncaoSistemaController.store);
routes.put('/funcaosistema/:id',FuncaoSistemaController.update);
routes.delete('/funcaosistema/:id',FuncaoSistemaController.remove);

routes.get('/statusmudanca',StatusMudancaController.index);
routes.get('/statusmudanca/:id',StatusMudancaController.show);
routes.post('/statusmudanca',StatusMudancaController.store);
routes.put('/statusmudanca/:id',StatusMudancaController.update);
routes.delete('/statusmudanca/:id',StatusMudancaController.remove);

routes.get('/vafs',VAFSController.index);
routes.get('/vafs/:id',VAFSController.show);
routes.post('/vafs',VAFSController.store);
routes.put('/vafs/:id',VAFSController.update);
routes.delete('/vafs/:id',VAFSController.remove);

module.exports = routes;