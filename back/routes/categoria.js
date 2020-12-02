'use strict'

var express = require('express');
var categoriaController = require('../controllers/CategoriaController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/categorias'});

var api = express.Router();

api.post('/categoria/registro',path,categoriaController.registro);
api.put('/categoria/:id/:banner?',path,categoriaController.actualizar);
api.get('/categoria/:filtro?',categoriaController.listar);
api.get('/categoria/one/:id?',categoriaController.list_one);
api.get('/categoria/resources/thumbnails/:img?',categoriaController.get_img);
api.delete('/categoria/:id?',categoriaController.eliminar);

api.get('/categoria/get/slider',categoriaController.get_car_slide);

module.exports = api;