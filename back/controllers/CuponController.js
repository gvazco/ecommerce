'use strict'

var Cupon = require('../models/cupon');

function registro(req,res){
    let data = req.body;

    var cupon = new Cupon;

    cupon.tipo = data.tipo;
    cupon.descuento = data.descuento;
    cupon.user = data.user;
    cupon.codigo = data.codigo;

    if(data.categoria){
        cupon.categoria = data.categoria;
    }else{
        cupon.categoria = null;
    }
    if(data.subcategoria){
        cupon.subcategoria = data.subcategoria;
    }else{
        cupon.subcategoria = '';
    }

    cupon.save((err,cupon_data)=>{
        if(!err){
            if(cupon_data){
                res.status(200).send({cupon: cupon_data});
            }else{
                res.status(500).send({error: err});
                console.log(err);
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function listar(req,res){
    Cupon.find().populate('categoria').exec((err,data_cupones)=>{
        if(!err){
            if(data_cupones){
                res.status(200).send({cupones: data_cupones});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function get_cupon(req,res){
    var codigo = req.params['id'];
    console.log(codigo);
    Cupon.findOne({codigo:codigo}).populate('categoria').exec((err,data_cupone)=>{
        if(!err){
            if(data_cupone){
                res.status(200).send({cupone: data_cupone});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}


function eliminar(req,res){
    var id = req.params['id'];

    Cupon.findOneAndRemove({_id:id}, (err, cupon_delete) =>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(cupon_delete){
                res.status(200).send({cupon:cupon_delete});
            }else{
                res.status(403).send({message: 'No se elimino ningun registro'});
            }
        }
    })
}

module.exports = {
    registro,
    listar,
    eliminar,
    get_cupon
}