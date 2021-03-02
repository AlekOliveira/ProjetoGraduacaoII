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
routes.get('/arquivo',ArquivoController.store);
routes.get('/arquivo/:id',ArquivoController.update);
routes.get('/arquivo/:id',ArquivoController.remove);

routes.get('/cliente',ClienteController.index);
routes.get('/cliente/:id',ClienteController.show);
routes.get('/cliente',ClienteController.store);
routes.get('/cliente/:id',ClienteController.update);
routes.get('/cliente/:id',ClienteController.remove);

routes.get('/funcao',FuncaoController.index);
routes.get('/funcao/:id',FuncaoController.show);
routes.get('/funcao',FuncaoController.store);
routes.get('/funcao/:id',FuncaoController.update);
routes.get('/funcao/:id',FuncaoController.remove);

routes.get('/mudanca',MudancaController.index);
routes.get('/mudanca/:id',MudancaController.show);
routes.get('/mudanca',MudancaController.store);
routes.get('/mudanca/:id',MudancaController.update);
routes.get('/mudanca/:id',MudancaController.remove);

routes.get('/sistema',SistemaController.index);
routes.get('/sistema/:id',SistemaController.show);
routes.get('/sistema',SistemaController.store);
routes.get('/sistema/:id',SistemaController.update);
routes.get('/sistema/:id',SistemaController.remove);

routes.get('/tipomudanca',TipoMudancaController.index);
routes.get('/tipomudanca/:id',TipoMudancaController.show);
routes.get('/tipomudanca',TipoMudancaController.store);
routes.get('/tipomudanca/:id',TipoMudancaController.update);
routes.get('/tipomudanca/:id',TipoMudancaController.remove);

routes.get('/usuario',UsuarioController.index);
routes.get('/usuario/:id',UsuarioController.show);
routes.get('/usuario',UsuarioController.store);
routes.get('/usuario/:id',UsuarioController.update);
routes.get('/usuario/:id',UsuarioController.remove);

routes.get('/versao',VersaoArquivoController.index);
routes.get('/versao/:id',VersaoArquivoController.show);
routes.get('/versao',VersaoArquivoController.store);
routes.get('/versao/:id',VersaoArquivoController.update);
routes.get('/versao/:id',VersaoArquivoController.remove);

routes.get('/funcaosistema',FuncaoSistemaController.index);
routes.get('/funcaosistema/:id',FuncaoSistemaController.show);
routes.get('/funcaosistema',FuncaoSistemaController.store);
routes.get('/funcaosistema/:id',FuncaoSistemaController.update);
routes.get('/funcaosistema/:id',FuncaoSistemaController.remove);

routes.get('/statusmudanca',StatusMudancaController.index);
routes.get('/statusmudanca/:id',StatusMudancaController.show);
routes.get('/statusmudanca',StatusMudancaController.store);
routes.get('/statusmudanca/:id',StatusMudancaController.update);
routes.get('/statusmudanca/:id',StatusMudancaController.remove);

routes.get('/vafs',VAFSController.index);
routes.get('/vafs/:id',VAFSController.show);
routes.get('/vafs',VAFSController.store);
routes.get('/vafs/:id',VAFSController.update);
routes.get('/vafs/:id',VAFSController.remove);

module.exports = routes;