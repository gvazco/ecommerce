'use strict'
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
var app = express();
var fs = require('fs');
var fetch = require('node-fetch');
var rimraf = require("rimraf");
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var authenticate = false;
io.on('connection', function(socket) {
    console.log('User connected');
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
    socket.on('save-carrito', function(data) {
        io.emit('new-carrito', data);
        console.log(data);
    });
    socket.on('save-carrito_dos', function(data) {
        io.emit('new-carrito_dos', data);
        console.log(data);
    });
    socket.on('save-mensaje', function(data) {
        io.emit('new-mensaje', data);
    });
    socket.on('save-formmsm', function(data) {
        io.emit('new-formmsm', data);
    });
    socket.on('save-stock', function(data) {
        io.emit('new-stock', data);
    });
});
var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var marca_routes = require('./routes/marca');
var producto_routes = require('./routes/producto');
var galeria_routes = require('./routes/galeria');
var selector_routes = require('./routes/selector');
var color_routes = require('./routes/color');
var carrito_routes = require('./routes/carrito');
var direccion_routes = require('./routes/direccion');
var cupon_routes = require('./routes/cupon');
var postal_routes = require('./routes/postal');
var venta_routes = require('./routes/venta');
var comentario_routes = require('./routes/comentario');
var ticket_routes = require('./routes/ticket');
var congeneral_routes = require('./routes/congeneral');
var contacto_routes = require('./routes/contacto');
var ingreso_routes = require('./routes/ingreso');
const congeneral = require('./models/congeneral');
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, res) => {
    if (err) {
        throw err;
    } else {
        server.listen(port, function() {
            console.log("Servidor " + port);    
        });
    }
});
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use((req, res, next) => {
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});
app.use('/api', user_routes);
app.use('/api', marca_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_routes);
app.use('/api', galeria_routes);
app.use('/api', selector_routes);
app.use('/api', color_routes);
app.use('/api', carrito_routes);
app.use('/api', direccion_routes);
app.use('/api', cupon_routes);
app.use('/api', postal_routes);
app.use('/api', venta_routes);
app.use('/api', comentario_routes);
app.use('/api', ticket_routes);
app.use('/api', congeneral_routes);
app.use('/api', contacto_routes);
app.use('/api', ingreso_routes);
module.exports = app;