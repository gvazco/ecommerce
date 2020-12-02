'use strict'

var Categoria = require('../models/categoria');
var fs = require('fs');
var path = require('path');

function listar(req,res){
    var filtro = req.params['filtro'];


    Categoria.find({nombre:new RegExp(filtro,'i')}).sort({nombre:1}).exec((err,categoria_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(categoria_data){
                res.status(200).send({categorias: categoria_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });

}

function list_one(req,res){
    var id = req.params['id'];

    Categoria.findOne({_id:id},(err,categoria_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(categoria_data){
                res.status(200).send({categoria: categoria_data});
            }else{
                res.status(500).send({message: 'No se encontró ninguna categoria con este ID.'});
            }
        }
    })

}


function registro(req,res){
    var data = req.body;
    console.log(data);
    
    var img_banner = req.files.banner;

    if(img_banner == null){
    
        var categoria = new Categoria;
        categoria.icono = data.icono;
        categoria.nombre = data.nombre;
        categoria.subcategorias = data.subcategorias;
        categoria.banner = null;
        categoria.state_banner = data.state_banner;
    
        categoria.save((err,categoria_save)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(categoria_save){
                    res.status(200).send({categoria: categoria_save});
                }else{
                    res.status(403).send({message: 'No se registro el producto, vuelva a intentar nuevamente.'}); 
                }
            }
        });
    }else{
        var imagen_path = req.files.banner.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];
    
        var categoria = new Categoria;
        categoria.nombre = data.nombre;
        categoria.icono = data.icono;
        categoria.subcategorias = data.subcategorias;
        categoria.banner = imagen_name;
        categoria.state_banner = data.state_banner;
    
        categoria.save((err,categoria_save)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(categoria_save){
                    res.status(200).send({categoria: categoria_save});
                }else{
                    res.status(403).send({message: 'No se registro el producto, vuelva a intentar nuevamente.'}); 
                }
            }
        });
    }
}

function get_car_slide(req,res){
    Categoria.find({state_banner:true}).limit(3).exec((err,categoria_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(categoria_data){
                res.status(200).send({categorias: categoria_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });
}

function actualizar(req,res){
    var data = req.body;

    var id = req.params['id'];
    var banner = req.params['banner'];
    
    var img_banner = req.files.banner;
    console.log(data);

    if(img_banner == null){
    
        Categoria.findByIdAndUpdate({_id:id},{nombre:data.nombre, subcategorias:data.subcategorias,icono:data.icono,state_banner:data.state_banner},(err,categoria_update)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(categoria_update){
                    res.status(200).send({categoria: categoria_update});
                }else{
                    res.status(500).send({message: 'No se actualizó el producto, vuelva a intentar nuevamente.'});
                }
            }
        })
    }else{


        fs.stat('./uploads/categorias/'+banner, function(err) {
            if (!err) {
                fs.unlink('./uploads/categorias/'+banner, (err)=>{
                    if(err) throw err;
                });
            }else{
                console.log(banner);
                
            }
        });

        var imagen_path = req.files.banner.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];
    
        Categoria.findByIdAndUpdate({_id:id},{nombre:data.nombre, subcategorias:data.subcategorias,banner:imagen_name,icono:data.icono,state_banner:data.state_banner},(err,categoria_update)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(categoria_update){
                    res.status(200).send({categoria: categoria_update});
                }else{
                    res.status(500).send({message: 'No se actualizó el producto, vuelva a intentar nuevamente.'});
                }
            }
        })
    }
}

function get_img(req,res) {  
    var img = req.params['img'];


    if(img != "null"|| img != 'undefined'){
        fs.stat('./uploads/categorias/'+img, function(err) {
            if (!err) {
                let path_img = './uploads/categorias/'+ img;
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

    Categoria.findOneAndRemove({_id:id}, (err, categoria_delete) =>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(categoria_delete){
                fs.stat('./uploads/categorias/'+categoria_delete.banner, function(err) {
                    if (!err) {
                        fs.unlink('./uploads/categorias/'+categoria_delete.banner, (err)=>{
                            if(err) throw err;
                        });
                    }else{

                    }
                });
                res.status(200).send({categoria:categoria_delete});
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
    get_car_slide
}