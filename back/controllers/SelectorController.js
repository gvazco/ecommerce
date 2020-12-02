'use strict'

var Selector = require('../models/selector');

function listar(req,res){
    var id = req.params['id'];
    Selector.find({producto:id},(err,data_selector)=>{
        if(!err){
            if(data_selector){
                res.status(200).send({selectores: data_selector});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function listar_todo(req,res){
    Selector.find((err,data_selector)=>{
        if(!err){
            if(data_selector){
                res.status(200).send({selectores: data_selector});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function registro(req,res){
    let data = req.body;

    var selector = new Selector;
    selector.titulo = data.titulo;
    selector.producto = data.producto;
    selector.estado = true;
    selector.save((err,selector_data)=>{
        if(!err){
            if(selector_data){
                res.status(200).send({user: selector_data});
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

    Selector.findOneAndRemove({_id:id}, (err, selector_delete) =>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(selector_delete){
                res.status(200).send({selector:selector_delete});
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
    listar_todo
}