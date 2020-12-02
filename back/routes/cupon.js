'use strict'

var express = require('express');
var cuponController = require('../controllers/CuponController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.post('/cupon/registro',cuponController.registro);
api.get('/cupones',cuponController.listar);
api.delete('/cupones/remove/:id',cuponController.eliminar);
api.get('/cupon/data/:id',cuponController.get_cupon);

module.exports = api;