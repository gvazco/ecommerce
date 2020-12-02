'use strict'

var express = require('express');
var carritoController = require('../controllers/CarritoController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.post('/carrito/registro',carritoController.registro);
api.get('/carrito/limit/data/:id',carritoController.preview_carrito);
api.delete('/carrito/delete/:id',carritoController.remove_carrito);

module.exports = api;