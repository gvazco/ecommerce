'use strict'

var express = require('express');
var ticketController = require('../controllers/TicketController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.post('/ticket_registro/registro',ticketController.create_ticket);
api.post('/ticket_msm/send',ticketController.send);
api.get('/ticket_listar/listar/:id',ticketController.listar_tickets);
api.get('/ticket_chat/chat/:de/:para',ticketController.data_messenger);
api.get('/ticket_data/one/:id',ticketController.get_ticket);
api.get('/ticket_admin/all/:status?/:estado?',ticketController.listar_todos);

module.exports = api;