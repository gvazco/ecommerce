'use strict'

var Promocion = require('../models/promocion');
var Slider = require('../models/slider');
var Congeneral = require('../models/congeneral');
var fs = require('fs');
var path = require('path');

function get_data(req,res){
    Congeneral.findOne().exec((err,data)=>{
        if(data){
            res.status(200).send({data:data});
        }
    });
}

function actualizar(req,res){
    var data = req.body;

    var id = req.params['id'];
    var logo = req.params['logo'];
    var favicon = req.params['favicon'];
    
    var img_favicon = req.files.favicon;
    var img_logo = req.files.logo;

    if(img_logo == null && img_favicon == null){
        Congeneral.findByIdAndUpdate({_id:id},{titulo:data.titulo, cr:data.cr, cr:data.cr, telefono_uno:data.telefono_uno, telefono_dos:data.telefono_dos, email_uno:data.email_uno, email_dos:data.email_dos, direccion:data.direccion, horarios:data.horarios, iframe_mapa:data.iframe_mapa,facebook:data.facebook,instagram:data.instagram,youtube:data.youtube,twitter:data.twitter},(err,data)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(data){
                    res.status(200).send({marca: data});
                }else{
                    res.status(500).send({message: 'No se actualizó la configuración, vuelva a intentar nuevamente.'});
                }
            }
        })
    }else if(img_logo && img_favicon == null){
        console.log('2');
        fs.stat('./uploads/configuraciones/'+logo, function(err) {
            if (!err) {
                fs.unlink('./uploads/configuraciones/'+logo, (err)=>{
                    if(err) throw err;
                });
            }else{
                console.log(logo);
                
            }
        });

        var logo_path = req.files.logo.path;
        var name = logo_path.split('\\');
        var logo_logo = name[2];
    
        Congeneral.findByIdAndUpdate({_id:id},{titulo:data.titulo, cr:data.cr, cr:data.cr, telefono_uno:data.telefono_uno, telefono_dos:data.telefono_dos, email_uno:data.email_uno, email_dos:data.email_dos, direccion:data.direccion, horarios:data.horarios, iframe_mapa:data.iframe_mapa,logo:logo_logo,facebook:data.facebook,instagram:data.instagram,youtube:data.youtube,twitter:data.twitter},(err,marca_update)=>{
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
    else if(img_favicon && img_logo == null){
        console.log('3');
        fs.stat('./uploads/configuraciones/'+favicon, function(err) {
            if (!err) {
                fs.unlink('./uploads/configuraciones/'+favicon, (err)=>{
                    if(err) throw err;
                });
            }else{
                console.log(favicon);
                
            }
        });

        var favicon_path = req.files.favicon.path;
        var name = favicon_path.split('\\');
        var favicon_favicon = name[2];
    
        Congeneral.findByIdAndUpdate({_id:id},{titulo:data.titulo, cr:data.cr, cr:data.cr, telefono_uno:data.telefono_uno, telefono_dos:data.telefono_dos, email_uno:data.email_uno, email_dos:data.email_dos, direccion:data.direccion, horarios:data.horarios, iframe_mapa:data.iframe_mapa,favicon:favicon_favicon,facebook:data.facebook,instagram:data.instagram,youtube:data.youtube,twitter:data.twitter},(err,marca_update)=>{
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
    }else if(img_favicon && img_logo){
        console.log('3');
        fs.stat('./uploads/configuraciones/'+logo, function(err) {
            if (!err) {
                fs.unlink('./uploads/configuraciones/'+logo, (err)=>{
                    if(err) throw err;
                });
            }else{
            }
        });

        fs.stat('./uploads/configuraciones/'+favicon, function(err) {
            if (!err) {
                fs.unlink('./uploads/configuraciones/'+favicon, (err)=>{
                    if(err) throw err;
                });
            }else{
            }
        });

        var favicon_path = req.files.favicon.path;
        var name = favicon_path.split('\\');
        var favicon_favicon = name[2];

        var logo_path = req.files.logo.path;
        var name = logo_path.split('\\');
        var logo_logo = name[2];
    
        Congeneral.findByIdAndUpdate({_id:id},{titulo:data.titulo, cr:data.cr, cr:data.cr, telefono_uno:data.telefono_uno, telefono_dos:data.telefono_dos, email_uno:data.email_uno, email_dos:data.email_dos, direccion:data.direccion, horarios:data.horarios, iframe_mapa:data.iframe_mapa,favicon:favicon_favicon,logo:logo_logo,facebook:data.facebook,instagram:data.instagram,youtube:data.youtube,twitter:data.twitter},(err,marca_update)=>{
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
        fs.stat('./uploads/configuraciones/'+img, function(err) {
            if (!err) {
                let path_img = './uploads/configuraciones/'+ img;
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

function get_promocion(req,res){
    Promocion.findOne().exec((err,data)=>{
        if(data){
            res.status(200).send({data:data});
        }
    });
}

function promocion(req,res){
    var data = req.body;

    var id = req.params['id'];
    var banner = req.params['banner'];

    var img_banner = req.files.banner;

    if(img_banner == null){
        Promocion.findByIdAndUpdate({_id:id},{etiqueta:data.etiqueta, first_title:data.first_title, producto_title:data.producto_title, subtitulo:data.subtitulo, end:data.end, enlace:data.enlace,estado:data.estado},(err,data)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(data){
                    res.status(200).send({data: data});
                }else{
                    res.status(500).send({message: 'No se actualizó la configuración, vuelva a intentar nuevamente.'});
                }
            }
        })
    }else if(img_banner){
       
        fs.stat('./uploads/configuraciones/'+banner, function(err) {
            if (!err) {
                fs.unlink('./uploads/configuraciones/'+banner, (err)=>{
                    if(err) throw err;
                });
            }else{
                console.log(banner);
                
            }
        });

        var banner_path = req.files.banner.path;
        var name = banner_path.split('\\');
        var banner_banner = name[2];

        Promocion.findByIdAndUpdate({_id:id},{etiqueta:data.etiqueta, first_title:data.first_title, producto_title:data.producto_title, subtitulo:data.subtitulo, end:data.end, enlace:data.enlace,estado:data.estado, banner: banner_banner},(err,data)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(data){
                    res.status(200).send({data: data});
                }else{
                    res.status(500).send({message: 'No se actualizó la configuración, vuelva a intentar nuevamente.'});
                }
            }
        })
    }
}

function slider(req,res){
    var data = req.body;

    var id = req.params['id'];
    var banner = req.params['banner'];
    console.log(id);
    var img_banner = req.files.imagen;

    if(img_banner == null){
        Slider.findByIdAndUpdate({_id:id},{titulo_uno:data.titulo_uno,titulo_dos:data.titulo_dos,subtitulo:data.subtitulo,estado:data.estado},(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(data){
                    res.status(200).send({data: data});
                }else{
                    res.status(500).send({message: 'No se actualizó la configuración, vuelva a intentar nuevamente.'});
                }
            }
        })
    }else if(img_banner){
       
        fs.stat('./uploads/configuraciones/'+banner, function(err) {
            if (!err) {
                fs.unlink('./uploads/configuraciones/'+banner, (err)=>{
                    if(err) throw err;
                });
            }else{
                console.log(banner);
                
            }
        });

        var banner_path = req.files.imagen.path;
        var name = banner_path.split('\\');
        var banner_banner = name[2];

        Slider.findByIdAndUpdate({_id:id},{titulo_uno:data.titulo_uno,titulo_dos:data.titulo_dos,subtitulo:data.subtitulo,estado:data.estado, imagen: banner_banner},(err,data)=>{
            if(err){
                res.status(500).send({message: 'Ocurrió un error en el servidor.'});
            }else{
                if(data){
                    res.status(200).send({data: data});
                }else{
                    res.status(500).send({message: 'No se actualizó la configuración, vuelva a intentar nuevamente.'});
                }
            }
        })
    }
}


function get_slider(req,res){
    Slider.find().exec((err,data)=>{
        if(data){
            res.status(200).send({data:data});
        }
    });
}

function get_slider_one(req,res){
    var id = req.params['id'];
    Slider.findOne({_id:id}).exec((err,data)=>{
        if(data){
            res.status(200).send({data:data});
        }
    });
}


module.exports = {
    get_data,
    actualizar,
    get_img,
    promocion,
    get_promocion,
    slider,
    get_slider,
    get_slider_one
}