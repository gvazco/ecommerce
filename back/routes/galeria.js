'use strict'

var express = require('express');
var galeriaController = require('../controllers/GaleriaController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/galeria'});

var api = express.Router();

api.post('/galeria/registro',path,galeriaController.registro);
api.get('/galeria/:filtro?',galeriaController.listar);
api.get('/galeria/resources/thumbnails/:img?',galeriaController.get_img);
api.delete('/galeria/:id?',galeriaController.eliminar);
api.get('/galeria_producto/find/:id?',galeriaController.find_by_product);

module.exports = api;