'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComentarioSchema = Schema({
    comentario: {type: String, required: true},
    pros: {type: String, required: true},
    cons: {type: String, required: true},
    estrellas: {type: Number, required: true},
    user: {type: Schema.ObjectId, ref: 'user'},
    producto: {type: Schema.ObjectId, ref: 'producto'},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('comentario',ComentarioSchema);