'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CongeneralSchema = Schema({
    titulo: {type: String, required: true},
    logo: {type: String, required: true},
    favicon: {type: String, required: true},
    cr: {type: String, required: true},
    telefono_uno: {type: String, required: true},
    telefono_dos: {type: String, required: true},
    email_uno: {type: String, required: true},
    email_dos: {type: String, required: true},
    direccion: {type: String, required: true},
    horarios: {type: String, required: true},
    iframe_mapa: {type: String, required: true},

    facebook: {type: String, required: true},
    instagram: {type: String, required: true},
    youtube: {type: String, required: true},
    twitter: {type: String, required: true},
});

module.exports = mongoose.model('congeneral',CongeneralSchema);