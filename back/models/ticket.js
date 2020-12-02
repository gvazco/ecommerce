'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = Schema({
    tema: {type: String, required: true},
    estado: {type: String},
    status: {type: String},
    user: {type: Schema.ObjectId, ref: 'user'},
    venta: {type: Schema.ObjectId, ref: 'venta'},
    createdAt : {type: Date, default: Date.now, required : true},
});

module.exports = mongoose.model('ticket',TicketSchema);