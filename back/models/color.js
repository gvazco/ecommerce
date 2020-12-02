'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ColorSchema = Schema({
    titulo: {type: String, required: true},
    color: {type: String, required: true},
    producto: {type: Schema.ObjectId, ref: 'producto'},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('color',ColorSchema);