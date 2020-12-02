'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngresoSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'user',required:false},
    factura: {type: String,},
    total_pagado: {type: String, required : true},
    proveedor: {type: String, required : true},
    nota: {type: String},
    month : {type: String},
    day : {type: String},
    year : {type: String},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('ingreso',IngresoSchema);