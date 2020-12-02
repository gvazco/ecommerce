'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: {type: String,required: true},
    icono: {type: String,required: true},
    subcategorias : {type: String, required: true},
    banner: {type: String},
    state_banner:{type: Boolean},
    createdAt : {type: Date, default: Date.now, required : true},
    updatedAt : {type: Date}
});

module.exports = mongoose.model('categoria',UserSchema);