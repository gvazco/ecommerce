'use strict'

var Color = require('../models/color');

function listar(req,res){
    var id = req.params['id'];
    Color.find({producto:id},(err,data_color)=>{
        if(!err){
            if(data_color){
                res.status(200).send({colores: data_color});
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

    var color = new Color;
    color.titulo = data.titulo;
    color.producto = data.producto;
    color.color = data.color;
    color.save((err,color_data)=>{
        if(!err){
            if(color_data){
                res.status(200).send({color: color_data});
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

    Color.findOneAndRemove({_id:id}, (err, color_delete) =>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(color_delete){
                res.status(200).send({color:color_delete});
            }else{
                res.status(403).send({message: 'No se elimino ningun registro'});
            }
        }
    })
}


module.exports = {
    registro,
    listar,
    eliminar
    
}