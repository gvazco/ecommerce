'use strict'

var express = require('express');
var colorController = require('../controllers/ColorController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.post('/color/registro',colorController.registro);
api.get('/colores/:id?',colorController.listar);
api.delete('/color/:id?',colorController.eliminar);



module.exports = api;