'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'user'},
    venta: {type: Schema.ObjectId, ref: 'venta'},
    producto: {type: Schema.ObjectId, ref: 'producto'},
    cantidad: {type: Number,required: true},
    precio: {type: Number,required: true},
    color: {type: String,required: true},
    selector: {type: String,required: true},
});

module.exports = mongoose.model('detalle',DetalleSchema);