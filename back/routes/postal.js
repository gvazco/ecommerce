'use strict'

var express = require('express');
var postalController = require('../controllers/PostalController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.post('/postal/registro',postalController.registro);
api.get('/postales',postalController.listar);
api.delete('/postales/remove/:id',postalController.eliminar);

module.exports = api;