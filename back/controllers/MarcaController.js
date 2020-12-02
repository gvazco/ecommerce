'use strict'

var Marca = require('../models/marca');
var fs = require('fs');
var path = require('path');

function listar(req,res){
    var filtro = req.params['filtro'];

    Marca.find({nombre:new RegExp(filtro,'i')}).sort({nombre:1}).exec((err,marca_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(marca_data){
                res.status(200).send({marcas: marca_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });

}


function list_one(req,res){
    var id = req.params['id'];

    Marca.findOne({_id:id},(err,marca_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(marca_data){
                res.status(200).send({marca: marca_data});
            }else{
                res.status(500).send({message: 'No se encontró ninguna categoria con este ID.'});
            }
        }
    })

}


function registro(req,res){
    var data = req.body;
    
    var img_banner = req.files.banner;

    if(img_banner == null){
    
        var marca = new Marca;
        marca.nombre = data.nombre;
        marca.descripcion = data.descripcion;
        marca.banner = null;
    
        marca.save((err,marca_save)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(marca_save){
                    res.status(200).send({marca: marca_save});
                }else{
                    res.status(403).send({message: 'No se registro la marca, vuelva a intentar nuevamente.'}); 
                }
            }
        });
    }else{
        var imagen_path = req.files.banner.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];
    
        var marca = new Marca;
        marca.nombre = data.nombre;
        marca.descripcion = data.descripcion;
        marca.banner = imagen_name;
    
        marca.save((err,marca_save)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(marca_save){
                    res.status(200).send({marca: marca_save});
                }else{
                    res.status(403).send({message: 'No se registro la marca, vuelva a intentar nuevamente.'}); 
                }
            }
        });
    }
}

function actualizar(req,res){
    var data = req.body;

    var id = req.params['id'];
    var banner = req.params['banner'];
    
    var img_banner = req.files.banner;

    if(img_banner == null){
    
        Marca.findByIdAndUpdate({_id:id},{nombre:data.nombre, descripcion:data.descripcion},(err,marca_update)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(marca_update){
                    res.status(200).send({marca: marca_update});
                }else{
                    res.status(500).send({message: 'No se actualizó el marca, vuelva a intentar nuevamente.'});
                }
            }
        })
    }else{


        fs.stat('./uploads/marcas/'+banner, function(err) {
            if (!err) {
                fs.unlink('./uploads/marcas/'+banner, (err)=>{
                    if(err) throw err;
                });
            }else{
                console.log(banner);
                
            }
        });

        var imagen_path = req.files.banner.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];
    
        Marca.findByIdAndUpdate({_id:id},{nombre:data.nombre, descripcion:data.descripcion,banner:imagen_name},(err,marca_update)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(marca_update){
                    res.status(200).send({marca: marca_update});
                }else{
                    res.status(500).send({message: 'No se actualizó el marca, vuelva a intentar nuevamente.'});
                }
            }
        })
    }
}

function get_img(req,res) {  
    var img = req.params['img'];


    if(img != "null"|| img != 'undefined'){
        fs.stat('./uploads/marcas/'+img, function(err) {
            if (!err) {
                let path_img = './uploads/marcas/'+ img;
                res.status(200).sendFile(path.resolve(path_img));
            }
            else if (err.code === 'ENOENT') {
                let path_img = './uploads/default.jpg';
                res.status(200).sendFile(path.resolve(path_img));
            }
        }); 
    }else{
        let path_img = './uploads/default.jpg';
        res.status(200).sendFile(path.resolve(path_img));
    } 
    
}


function eliminar(req,res){
    var id = req.params['id'];

    Marca.findOneAndRemove({_id:id}, (err, marca_delete) =>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(marca_delete){
                fs.stat('./uploads/categorias/'+marca_delete.banner, function(err) {
                    if (!err) {
                        fs.unlink('./uploads/categorias/'+marca_delete.banner, (err)=>{
                            if(err) throw err;
                        });
                    }else{

                    }
                });
                res.status(200).send({marca:marca_delete});
            }else{
                res.status(403).send({message: 'No se elimino ningun registro'});
            }
        }
    })
}




module.exports = {
    registro,
    actualizar,
    listar,
    list_one,
    get_img,
    eliminar,
    
}