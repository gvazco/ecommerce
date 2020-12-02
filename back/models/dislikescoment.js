'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DislikescomentSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'user'},
    comentario: {type: Schema.ObjectId, ref: 'comentario'},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('dislikescoment',DislikescomentSchema);