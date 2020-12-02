'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuponSchema = Schema({
    categoria: {type: Schema.ObjectId, ref: 'categoria',required:false},
    subcategoria: {type: String},
    tipo: {type: String,required: true},
    codigo: {type: String,required: true},
    descuento: {type: Number,required: true},
    user: {type: Schema.ObjectId, ref: 'user'},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('cupon',CuponSchema);