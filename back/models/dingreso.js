'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DingresoSchema = Schema({
    ingreso: {type: Schema.ObjectId, ref: 'ingreso',required:false},
    producto: {type: Schema.ObjectId, ref: 'producto',required:false},
    cantidad: {type: Number, required : true},
    precio_compra: {type: String, required : true},
    detalle: {type: String},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('dingreso',DingresoSchema);