'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    titulo: {type: String,required: true,unique : true},
    slug: {type: String,unique : true},
    poster: {type: String,required: true},
    precio_ahora: {type: Number,required: true},
    precio_antes: {type: Number,required: true},
    video_review: {type: String,required: true},
    info_short: {type: String, required: true},
    detalle: {type: String, required: true},
    stock: {type: Number,required: true},
    categoria: {type: Schema.ObjectId, ref: 'categoria'},
    subcategoria: {type: String, required: true},
    marca : {type: Schema.ObjectId, ref: 'marca'},
    nombre_selector: {type: String,required: true},
    stars: {type: Number},
    ventas: {type: Number},
    status: {type: String,required: true},
    createdAt : {type: Date, default: Date.now, required : true},
    updatedAt : {type: Date}
});

module.exports = mongoose.model('producto',ProductoSchema);