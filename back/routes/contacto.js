'use strict'

var express = require('express');
var contactoController = require('../controllers/ContactoController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.post('/contacto/registro',contactoController.registro);
api.get('/contacto/listar',contactoController.listar);

module.exports = api;