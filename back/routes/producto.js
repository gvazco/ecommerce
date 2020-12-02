'use strict'

var express = require('express');
var productoontroller = require('../controllers/ProductoController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/productos'});

var api = express.Router();

api.get('/productos/admin/:filtro?',productoontroller.listar_admin);
api.get('/producto_admin_editar/one/:id?',productoontroller.list_one);
api.get('/producto_admin/admin/desactivar/:id',productoontroller.desactivar);
api.get('/producto_admin/admin/activar/:id',productoontroller.activar);
api.get('/producto_admin/admin/papelera/:id',productoontroller.papelera);
api.get('/producto_admin_cat/cat/:filtro?',productoontroller.listar_cat);
api.get('/productos/papelera/:search?',productoontroller.listar_papelera);
api.get('/productos/cat/papelera/:filtro?',productoontroller.listar_cat_papelera);

api.get('/producto/:filtro?/:min?/:max?/:sub?/:cat?/:orden?/:marca?',productoontroller.listar);
api.get('/categoria/name/:nombre',productoontroller.cat_by_name);
api.get('/producto_by_slug/slug/:slug',productoontroller.find_by_slug);
api.get('/producto_cliente_autocomplete',productoontroller.listar_autocomplete);

api.post('/producto/registro',path,productoontroller.registro);
api.get('/productos_img_data/resources/thumbnails/:img?',productoontroller.get_img);
api.put('/producto/:id/:banner?',path,productoontroller.actualizar);


api.get('/productos_nuevos/show_producto',productoontroller.listar_newest);
api.get('/productos_stock/reducir/:id/:cantidad',productoontroller.reducir_stock);
api.get('/productos_stock/aumentar/:id/:cantidad',productoontroller.aumentar_stock);

api.get('/productos_ventas/aumentar/:id',productoontroller.aumentar_venta);
api.get('/productos_ventas/best_sellers',productoontroller.listar_best_sellers);
api.get('/productos_ventas/populares',productoontroller.listar_populares);

api.get('/producto_general/general/data/:filtro?',productoontroller.listar_general_data);
module.exports = api;