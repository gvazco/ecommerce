'use strict'

var express = require('express');
var direccionController = require('../controllers/DireccionController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.post('/direccion/registro',direccionController.registro);
api.get('/direcciones/:id',direccionController.listar);
api.put('/direccion/update/:id',direccionController.actualizar);
api.get('/direccion/data/:id',direccionController.get_direccion);

api.delete('/direccion/remove/:id',direccionController.eliminar);

module.exports = api;