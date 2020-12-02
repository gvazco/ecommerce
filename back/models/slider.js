'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sliderchema = Schema({
    imagen: {type: String, required: true},
    titulo_uno: {type: String, required: true},
    titulo_dos: {type: String, required: true},
    subtitulo: {type: String, required: true},
    estado: {type: Boolean},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('slider',Sliderchema);