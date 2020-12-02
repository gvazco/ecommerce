'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensajetSchema = Schema({
    msm: {type: String},
    ticket: {type: Schema.ObjectId, ref: 'ticket'},
    de: {type: Schema.ObjectId, ref: 'user'},
    para: {type: Schema.ObjectId, ref: 'user'},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('mensaje',MensajetSchema);