'use strict'

var Carrito = require('../models/carrito');
const { find } = require('../models/carrito');

function registro(req,res){
    let data = req.body;

    var carrito = new Carrito;
    carrito.user = data.user;
    carrito.producto = data.producto;
    carrito.precio = data.precio;
    carrito.color = data.color;
    carrito.selector = data.selector;
    carrito.cantidad = data.cantidad;
    carrito.save((err,carrito_sata)=>{
        if(!err){
            if(carrito_sata){
                res.status(200).send({carrito: carrito_sata});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function preview_carrito(req,res){
    var id = req.params['id'];

    Carrito.find({user:id}).populate('producto').sort({createdAt:-1}).exec((err,carrito_data)=>{
        if(!err){
            if(carrito_data){
                res.status(200).send({carrito: carrito_data});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function remove_carrito(req,res){
    var id = req.params['id'];
    Carrito.findByIdAndRemove({_id:id},(err,carrito_data)=>{
        if(!err){
            if(carrito_data){
                res.status(200).send({carrito: carrito_data});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

module.exports = {
    registro,
    preview_carrito,
    remove_carrito
}