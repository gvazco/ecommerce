'use strict'

var express = require('express');
var ingresoController = require('../controllers/IngresoController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/facturas'});

var api = express.Router();

api.post('/ingreso/registro',path,ingresoController.registro);
api.get('/ingreso/init_data',ingresoController.init_data);
api.get('/ingreso/listar/:search/:orden/:tipo',ingresoController.listar);
api.get('/ingreso/factura/:img',path,ingresoController.get_img);
api.get('/ingreso/detalle/:id',path,ingresoController.detalle);

module.exports = api;