'use strict'

var express = require('express');
var userController = require('../controllers/UserController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/users'});

var api = express.Router();

api.post('/registro',userController.registro);
api.post('/login',userController.login);
api.get('/user/data/:img?',userController.get_img);
api.get('/user_get/data/:id?',userController.list_one);
api.put('/user/actualizar/:id/:img?',path,userController.actualizar);
api.get('/user_get/admin',userController.get_data_user);


api.get('/user_token/set/:email',userController.set_token_recovery);
api.get('/user_verify/token/:email/:codigo',userController.verify_token_recovery);
api.put('/user_password/change/:email',userController.change_password);

module.exports = api;