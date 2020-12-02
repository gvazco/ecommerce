'use strict'

var Galeria = require('../models/galeria');
var fs = require('fs');
var path = require('path');

function listar(req,res){
    var filtro = req.params['filtro'];

    Galeria.find({producto:filtro},(err,marca_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(marca_data){
                res.status(200).send({imagenes: marca_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    })

 

}


 function registro(req,res,next){
    var params = req.body;
    
    if(req.files.imagenes){         
      
            req.files.imagenes.forEach((elem,index)=>{
                console.log(elem);
    
                var imagen_path = elem.path;
                var name = imagen_path.split('\\');
                var imagen_name = name[2];
                
                var galeria = new Galeria();
                galeria.producto = params.producto;
                galeria.imagen = imagen_name;

                
                galeria.save((err,img_save) =>{
                    if(err){  
                        res.status(500).send({error:err});
                    }
                });
    
            });  
            res.status(200).send({message:"Registrado"});
    }
}

function get_img(req,res) {  
    var img = req.params['img'];


    if(img != "null"|| img != 'undefined'){
        fs.stat('./uploads/galeria/'+img, function(err) {
            if (!err) {
                let path_img = './uploads/galeria/'+ img;
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

function find_by_product(req,res){
    var id = req.params['id'];

    console.log(id);
    if(id == 'null'){
        Galeria.find().exec((err,galeria_data)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(galeria_data){
                    res.status(200).send({galeria:galeria_data});
                }else{
                    res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                }
            }
        });
    }else{
        Galeria.find({producto:id}).exec((err,galeria_data)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(galeria_data){
                    res.status(200).send({galeria:galeria_data});
                }else{
                    res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                }
            }
        });
    }
   
}

function eliminar(req,res){
    var id = req.params['id'];

    Galeria.findOneAndRemove({_id:id}, (err, galeria_delete) =>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(galeria_delete){
                fs.stat('./uploads/galeria/'+galeria_delete.imagen, function(err) {
                    if (!err) {
                        fs.unlink('./uploads/galeria/'+galeria_delete.imagen, (err)=>{
                            if(err) throw err;
                        });
                    }else{

                    }
                });
                res.status(200).send({marca:galeria_delete});
            }else{
                res.status(403).send({message: 'No se elimino ningun registro'});
            }
        }
    })
}



module.exports = {
    registro,
    listar,
    get_img,
    eliminar,
    find_by_product
}