'use strict'

var express = require('express');
var congeneralController = require('../controllers/CongeneralController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/configuraciones'});

var api = express.Router();

api.get('/congeneral/obtener',congeneralController.get_data);
api.put('/congeneral/update/:id/:logo?/:favicon?',path,congeneralController.actualizar);
api.get('/congeneral/resources/thumbnails/:img?',congeneralController.get_img);
api.put('/promocion/update/:id/:banner?',path,congeneralController.promocion);
api.get('/promocion/obtener',congeneralController.get_promocion);

api.put('/slider/update/:id/:banner?',path,congeneralController.slider);
api.get('/slider/obtener',congeneralController.get_slider);
api.get('/slider/one/:id',congeneralController.get_slider_one);
module.exports = api;