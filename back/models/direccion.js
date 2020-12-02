'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    nombres_completos: {type: String,required: true},
    direccion: {type: String,required: true},
    referencia : {type: String,required: true},
    pais: {type: String,required: true},
    ciudad : {type: String, required: true},
    zip : {type: String, required: true},
    user: {type: Schema.ObjectId, ref: 'user'},
    createdAt : {type: Date, default: Date.now, required : true},
    updatedAt : {type: Date}
});

module.exports = mongoose.model('direccion',DireccionSchema);