'use strict'

var Contacto = require('../models/contacto');

function listar(req,res){
    Contacto.find().sort({createdAt:-1}).exec((err,data)=>{
        if(data){
            res.status(200).send({data: data});
        }
    });
}

function registro(req,res){
    let data = req.body;

    var contacto = new Contacto;
    contacto.nombres = data.nombres;
    contacto.mensaje = data.mensaje;
    contacto.tema = data.tema;
    contacto.correo = data.correo;
    contacto.telefono = data.telefono;

   

    contacto.save((err,data)=>{
        if(!err){
            if(data){
                res.status(200).send({data: data});
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
    listar
}
