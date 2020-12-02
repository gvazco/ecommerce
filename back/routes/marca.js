'use strict'

var express = require('express');
var marcaController = require('../controllers/MarcaController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/marcas'});

var api = express.Router();

api.post('/marca/registro',path,marcaController.registro);
api.put('/marca/:id/:banner?',path,marcaController.actualizar);
api.get('/marca/:filtro?',marcaController.listar);

api.get('/marca/one/:id?',marcaController.list_one);
api.get('/marca/resources/thumbnails/:img?',marcaController.get_img);
api.delete('/marca/:id?',marcaController.eliminar);

module.exports = api;