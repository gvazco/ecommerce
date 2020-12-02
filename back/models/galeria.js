'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GaleriaSchema = Schema({
    imagen: {type: String, required: true},
    producto: {type: Schema.ObjectId, ref: 'producto'},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('galeria',GaleriaSchema);