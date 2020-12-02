'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarcaSchema = Schema({
    nombre: {type: String,required: true},
    descripcion: {type: String,required: true},
    banner: {type: String},
    createdAt : {type: Date, default: Date.now, required : true},
    updatedAt : {type: Date}
});

module.exports = mongoose.model('marca',MarcaSchema);