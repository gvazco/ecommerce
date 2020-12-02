'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    first_name: {type: String,required: [true, 'Nombres es un campo requerido']},
    last_name: {type: String,required: [true, 'Apellidos es un campo requerido']},
    email: {type: String,required: [true, 'Email es un campo requerido']},
    password: {type: String,required: [true, 'Password es un campo requerido']},
    role: String,
    perfil: String,
    telefono: {type: String},
    pais: String,
    numdoc: String,
    recovery_token: String,
    createdAt : {type: Date, default: Date.now, required : true},
    updatedAt : {type: Date}
});

module.exports = mongoose.model('user',UserSchema);