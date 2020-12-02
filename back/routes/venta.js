'use strict'

var express = require('express');
var ventaController = require('../controllers/VentaController');
var auth = require('../middlewares/authenticate');


var api = express.Router();

api.post('/venta/registro',ventaController.registro);
api.get('/venta/data/:id',ventaController.listar);
api.get('/venta_track/detalle/:id',ventaController.data_detalle);
api.get('/venta_finalizar/venta/:id',ventaController.finalizar);
api.get('/venta_admin_init/init_data',ventaController.init_data_admin);

api.get('/cancelacion_evaluar/venta/:id',ventaController.evaluar_cancelacion);
api.post('/cancelacion_send/cancelar',ventaController.cancelar);

api.get('/get_cancelacion_admin/data/:wr?',ventaController.listar_cancelaciones);
api.get('/get_one_cancelacion_admin/one/:id?',ventaController.get_solicitud);

api.get('/cancelacion_send/reembolsar/:id/:idticket',ventaController.reembolsar);
api.get('/cancelacion_venta/obtener_data/:id',ventaController.obtener_data_cancelacion);

api.get('/evaluar_venta/data/:user/:producto',ventaController.evaluar_orden_coment);
api.get('/cancelacion_send/denegar/:id/:idticket',ventaController.denegar);

api.get('/venta_admin/listar/:search/:orden/:tipo',ventaController.listar_admin);
api.post('/venta_track/set/:id',ventaController.set_track);
api.get('/venta_enviado/update/:id',ventaController.update_enviado);
api.get('/venta_data/dashboard',ventaController.listar_ventas_dashboard);
api.get('/venta_data/detalles/hoy',ventaController.detalles_hoy);

module.exports = api;