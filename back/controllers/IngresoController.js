'use strict'

var Ingreso = require('../models/ingreso');
var Dingreso = require('../models/dingreso');
var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');


function registro(req,res){
    let data = req.body;
    let data_body = req.body;

    var mydate = new Date();
    var img_factura = req.files.factura;

    if(img_factura == null){
        var ingreso = new Ingreso();
        ingreso.user = data.user;
        ingreso.total_pagado = data.total_pagado;
        ingreso.proveedor = data.proveedor;
        ingreso.nota = data.nota;
        ingreso.day = mydate.getDate();
        ingreso.month = mydate.getMonth()+1;
        ingreso.year = mydate.getFullYear();

        ingreso.save((err,data)=>{
            if(!err){
                if(data){
                    var detalle = data.detalles;
                    var dingreso = new Dingreso();
                    dingreso.ingreso = data._id;
                    dingreso.producto = detalle.producto;
                    dingreso.cantidad = detalle.cantidad;
                    dingreso.precio_compra = detalle.precio_compra;
                    dingreso.detalle = detalle.detalle;

                    dingreso.save((err,data_ingreso)=>{
                        if(data_ingreso){

                        }
                    });
                 }
            }
        });
    }
    else{
        console.log(data);
        var factura_path = req.files.factura.path;
        var name = factura_path.split('\\');
        var factura_name = name[2];

        var ingreso = new Ingreso();
        ingreso.user = data.user;
        ingreso.total_pagado = data.total_pagado;
        ingreso.proveedor = data.proveedor;
        ingreso.nota = data.nota;
        ingreso.day = mydate.getDate();
        ingreso.month = mydate.getMonth()+1;
        ingreso.year = mydate.getFullYear();
        ingreso.factura = factura_name;
       

        ingreso.save((err,data_ingreso)=>{
            if(!err){
                if(data_ingreso){
                    let detalle = JSON.parse(data_body.detalles);
                    detalle.forEach(element => {
                        var dingreso = new Dingreso();
                        dingreso.ingreso = data_ingreso._id;
                        dingreso.producto = element.producto;
                        dingreso.cantidad = element.cantidad;
                        dingreso.precio_compra = element.precio_compra;
                        dingreso.detalle = element.detalle;
                        

                        dingreso.save((err,data_dingreso)=>{
                            if(data_dingreso){
                                Producto.findById({_id:data_dingreso.producto},(err,producto)=>{
       
                                    if(producto){
                                        Producto.findByIdAndUpdate({_id:data_dingreso.producto},{stock: parseInt(producto.stock) + parseInt(element.cantidad)},(err,data)=>{
                                            if(data){
                                                
                                            }
                                            else{
                                                console.log(err);
                                            }
                                        })
                                    }
                                })
                            }
                        });

                    });
                    res.status(200).send({message:"Registrado"});
                 }
            }else{
                console.log(err);
            }
        });
    }
    
}

function init_data(req,res){
    Ingreso.find().sort({createdAt:-1}).populate('user').exec((err,data)=>{
        if(data){
            res.status(200).send({data:data});
        }
    });
}

function listar(req,res){
    var tipo = req.params['tipo'];
    var orden = req.params['orden'];
    var search = req.params['search'];
    let data = search.split('-');

    var dia;
    var mes;

    if(data[1] == 0){
        dia = ''
    }
    else{
        dia = data[1];
    }
    if(data[2] == 0){
        mes = ''
    }else{
        mes = data[2];
    }
    

    if(tipo == 'null' && search == 'null'){
        if(orden == 'fecha+'){
            Ingreso.find().sort({createdAt:-1}).populate('user').exec((err,data)=>{
                if(data){
                    res.status(200).send({data:data});
                }
            });
        }
        else if(orden == 'fecha-'){
            Ingreso.find().sort({createdAt:1}).populate('user').exec((err,data)=>{
                if(data){
                    res.status(200).send({data:data});
                }
            });
        }
        else if(orden == 'pagado+'){
            Ingreso.find().sort({total_pagado:-1}).populate('user').exec((err,data)=>{
                if(data){
                    res.status(200).send({data:data});
                }
            });
        }
        else if(orden == 'pagado-'){
            Ingreso.find().sort({total_pagado:1}).populate('user').exec((err,data)=>{
                if(data){
                    res.status(200).send({data:data});
                }
            });
        }  
        else if(orden == 'null'){
            Ingreso.find().sort({createdAt:-1}).populate('user').exec((err,data)=>{
                if(data){
                    res.status(200).send({data:data});
                }
            });
        }
    }else{
        if(tipo == 'fecha'){
            if(orden == 'fecha+'){
                Ingreso.find({year:data[0],day:new RegExp(dia,'i'),month:new RegExp(mes,'i')}).populate('user').sort({createdAt:-1}).exec((err,data)=>{
                    if(data){
                        res.status(200).send({data:data});
                    }
                });
            }
            else if(orden == 'fecha-'){
                Ingreso.find({year:data[0],day:new RegExp(dia,'i'),month:new RegExp(mes,'i')}).populate('user').sort({createdAt:1}).exec((err,data)=>{
                    if(data){
                        res.status(200).send({data:data});
                    }
                });
            }
            if(orden == 'pagado+'){
                Ingreso.find({year:data[0],day:new RegExp(dia,'i'),month:new RegExp(mes,'i')}).populate('user').sort({total_pagado:-1}).exec((err,data)=>{
                    if(data){
                        res.status(200).send({data:data});
                    }
                });
            }
            if(orden == 'pagado-'){
                Ingreso.find({year:data[0],day:new RegExp(dia,'i'),month:new RegExp(mes,'i')}).populate('user').sort({total_pagado:1}).exec((err,data)=>{
                    if(data){
                        res.status(200).send({data:data});
                    }
                });
            }
        }else if(tipo == 'codigo'){
            
            Ingreso.find({_id:search}).populate('user').exec((err,data)=>{
                
                console.log(data);
                res.status(200).send({data:data});
                
            });
        }
    }
}


function get_img(req,res) {  
    var img = req.params['img'];


    if(img != "null"|| img != 'undefined'){
        fs.stat('./uploads/facturas/'+img, function(err) {
            if (!err) {
                let path_img = './uploads/facturas/'+ img;
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

function detalle(req,res){
    var id = req.params['id'];
    Ingreso.findById({_id:id}).populate('user').exec((err,data_ingreso)=>{
        Dingreso.find({ingreso:id}).populate('producto').exec((err,data_detalle)=>{
            res.status(200).send({
                ingreso:data_ingreso,
                detalle:data_detalle
            });
        });
    })
}

module.exports = {
    registro,
    listar,
    get_img,
    detalle,
    init_data
}