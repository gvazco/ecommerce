'use strict'

var Postal = require('../models/postal');

function registro(req,res){
    let data = req.body;

    var postal = new Postal;

    postal.titulo = data.titulo;
    postal.precio = data.precio;
    postal.tiempo = data.tiempo;
    postal.dias = data.dias;

    postal.save((err,postal_data)=>{
        if(!err){
            if(postal_data){
                res.status(200).send({postal: postal_data});
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
    Postal.find().exec((err,data_postales)=>{
        if(!err){
            if(data_postales){
                res.status(200).send({postales: data_postales});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

/* function get_cupon(req,res){
    var codigo = req.params['id'];
    console.log(codigo);
    Cupon.findOne({codigo:codigo},(err,data_cupone)=>{
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
 */

function eliminar(req,res){
    var id = req.params['id'];

    Postal.findOneAndRemove({_id:id}, (err, postal_delete) =>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(postal_delete){
                res.status(200).send({postal:postal_delete});
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
 
}