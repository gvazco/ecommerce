'use strict'

var Direccion = require('../models/direccion');

function registro(req,res){
    let data = req.body;

    var direccion = new Direccion;
    direccion.nombres_completos = data.nombres_completos;
    direccion.direccion = data.direccion;
    direccion.referencia = data.referencia;
    direccion.pais = data.pais;
    direccion.ciudad = data.ciudad;
    direccion.zip = data.zip;
    direccion.user = data.user;
    direccion.save((err,direccion_data)=>{
        if(!err){
            if(direccion_data){
                res.status(200).send({direccion: direccion_data});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function listar(req,res){
    var id = req.params['id'];
    Direccion.find({user:id},(err,data_direccion)=>{
        if(!err){
            if(data_direccion){
                res.status(200).send({direcciones: data_direccion});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function actualizar(req,res){
    let data = req.body;
    var id = req.params['id'];

    var direccion = {
        nombres_completos : data.nombres_completos,
        direccion : data.direccion,
        referencia : data.referencia,
        pais : data.pais,
        ciudad : data.ciudad,
        zip : data.zip,
        user : data.user,
    };
    
    Direccion.findByIdAndUpdate({_id:id},direccion,(err,direccion_data)=>{
        if(!err){
            if(direccion_data){
                res.status(200).send({direccion: direccion_data});
                console.log(direccion_data);
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function get_direccion(req,res){
    var id = req.params['id'];
    Direccion.findById({_id:id},(err,data_direccion)=>{
        if(!err){
            if(data_direccion){
                res.status(200).send({direccion: data_direccion});
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

    Direccion.findOneAndRemove({_id:id}, (err, carrito_delete) =>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(carrito_delete){
                res.status(200).send({carrito:carrito_delete});
            }else{
                res.status(403).send({message: 'No se elimino ningun registro'});
            }
        }
    })
}

module.exports = {
    registro,
    listar,
    actualizar,
    get_direccion,
    eliminar
}