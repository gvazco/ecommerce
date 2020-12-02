'use strict'

var express = require('express');
var selectorController = require('../controllers/SelectorController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.get('/selectores/todo',selectorController.listar_todo);
api.post('/selector/registro',selectorController.registro);
api.get('/selectores/:id?',selectorController.listar);
api.delete('/selector/:id?',selectorController.eliminar);



module.exports = api;