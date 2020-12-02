'use strict'

var express = require('express');
var comentarioController = require('../controllers/ComentarioController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.post('/comentario/registro',comentarioController.registro);
api.get('/comentarios/data',comentarioController.listar);
api.get('/comentarios/last',comentarioController.listar_last);

api.get('/comentarios_client/obtener/:id/:orden',comentarioController.get_data);

api.post('/comentarios_likes/add',comentarioController.add_like);
api.get('/comentarios_likes/get/:id',comentarioController.listar_likes);

api.post('/comentarios_dislikes/add',comentarioController.add_dislike);
api.get('/comentarios_dislikes/get/:id',comentarioController.listar_dislikes);

module.exports = api;