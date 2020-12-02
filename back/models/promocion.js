'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromocionSchema = Schema({
    etiqueta: {type: String, required: true},
    first_title: {type: String, required: true},
    producto_title: {type: String, required: true},
    subtitulo: {type: String, required: true},
    end: {type: String, required: true},
    enlace: {type: String, required: true},
    banner: {type: String, required: true},
    estado: {type: Boolean, required: true},
});

module.exports = mongoose.model('promocion',PromocionSchema);