'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SelectorSchema = Schema({
    titulo: {type: String, required: true},
    estado: {type: String, required: true},
    producto: {type: Schema.ObjectId, ref: 'producto'},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('selector',SelectorSchema);