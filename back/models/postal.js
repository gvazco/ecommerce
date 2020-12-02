'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostalSchema = Schema({
    titulo: {type: String},
    precio: {type: String,required: true},
    dias: {type: Number},
    tiempo: {type: String,required: true},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('postal',PostalSchema);