'use strict'

var Comentario = require('../models/comentario');
var Likescoment = require('../models/likescoment');
var Dislikescoment = require('../models/dislikescoment');

function listar(req,res){
    Comentario.find((err,data_review)=>{
        if(!err){
            if(data_review){
                res.status(200).send({comentarios: data_review});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function listar_last(req,res){
    Comentario.find().populate('user').sort({createdAt:-1}).limit(3).exec((err,data_review)=>{
        if(!err){
            if(data_review){
                res.status(200).send({data: data_review});
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
    console.log(data);
    
    Comentario.find({user: data.user, producto: data.producto},(err,comentario_data)=>{
        if(err){
            console.log(err);
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(comentario_data.length != 0){
                console.log('si');
                console.log(comentario_data);
                res.status(500).send({message: 'Ya emitió un comentario en esta compra.'});
            }else{
                console.log('no');
                console.log(comentario);
                var comentario = new Comentario;
                comentario.comentario = data.comentario;
                comentario.pros = data.pros;
                comentario.cons = data.cons;
                comentario.estrellas = data.estrellas;
                comentario.producto = data.producto;
                comentario.user = data.user;
                comentario.save((err,comentario_save)=>{
                    if(!err){
                        if(comentario_save){
                            res.status(200).send({comentario: comentario_save});
                        }else{
                            c
                            res.status(500).send({error: err});
                        }
                    }
                    else{
                        res.status(500).send({error: err});
                    }
                });
            }
        }
    });
}

function get_data(req,res){

    var id = req.params['id'];
    var orden = req.params['orden'];
    console.log(id);
    if(orden == 'fecha'){
        Comentario.find({producto:id}).populate('producto').populate('user').sort({createdAt:1}).exec((err,data_review)=>{
            if(!err){
                if(data_review){
                    res.status(200).send({comentarios: data_review});
                }else{
                    res.status(500).send({error: err});
                }
            }
            else{
                res.status(500).send({error: err});
            }
        });
    }
    if(orden == 'raiting'){
        Comentario.find({producto:id}).populate('producto').populate('user').sort({estrellas:-1}).exec((err,data_review)=>{
            if(!err){
                if(data_review){
                    res.status(200).send({comentarios: data_review});
                }else{
                    res.status(500).send({error: err});
                }
            }
            else{
                res.status(500).send({error: err});
            }
        });
    }
    if(orden == '-raiting'){
        Comentario.find({producto:id}).populate('producto').populate('user').sort({estrellas:1}).exec((err,data_review)=>{
            if(!err){
                if(data_review){
                    res.status(200).send({comentarios: data_review});
                }else{
                    res.status(500).send({error: err});
                }
            }
            else{
                res.status(500).send({error: err});
            }
        });
    }
}

function listar_likes(req,res){
    var id = req.params['id'];

    Likescoment.find({comentario: id}).exec((err,data)=>{
        if(data){
            res.status(200).send({data: data});
        }else{
            res.status(200).send({data: {}});
        }
    });
}

function listar_dislikes(req,res){
    var id = req.params['id'];

    Dislikescoment.find({comentario: id}).exec((err,data)=>{
        if(data){
            res.status(200).send({data: data});
        }else{
            res.status(200).send({data: {}});
        }
    });
}

function add_like(req,res){
    let data = req.body;
    
    Likescoment.findOne({user: data.user,comentario: data.comentario},(err,data_likes)=>{
        if(err){
            res.status(500).send({error: err});
        }else{
           
            if(data_likes != null){
                
                Likescoment.findOneAndRemove({_id:data_likes._id}).exec((err,likes)=>{
                    if(!err){
                        if(likes){
                            res.status(200).send({likes: likes});
                        }else{
                            c
                            res.status(500).send({error: err});
                        }
                    }
                    else{
                        res.status(500).send({error: err});
                    }
                });
            }else{
                
                var likescoment = new Likescoment;
                likescoment.user = data.user;
                likescoment.comentario = data.comentario;
               
                likescoment.save((err,likes)=>{
                    if(!err){
                        if(likes){
                            res.status(200).send({likes: likes});
                        }else{
                            c
                            res.status(500).send({error: err});
                        }
                    }
                    else{
                        res.status(500).send({error: err});
                    }
                });
            }
        }
    });
}

function add_dislike(req,res){
    let data = req.body;
    
    Dislikescoment.findOne({user: data.user,comentario: data.comentario},(err,data_dislikes)=>{
        if(err){
            res.status(500).send({error: err});
        }else{
           
            if(data_dislikes != null){
                
                Dislikescoment.findOneAndRemove({_id:data_dislikes._id}).exec((err,likes)=>{
                    if(!err){
                        if(likes){
                            res.status(200).send({dislikes: likes});
                        }else{
                            c
                            res.status(500).send({error: err});
                        }
                    }
                    else{
                        res.status(500).send({error: err});
                    }
                });
            }else{
                
                var dislikescoment = new Dislikescoment;
                dislikescoment.user = data.user;
                dislikescoment.comentario = data.comentario;
               
                dislikescoment.save((err,likes)=>{
                    if(!err){
                        if(likes){
                            res.status(200).send({dislikes: likes});
                        }else{
                            c
                            res.status(500).send({error: err});
                        }
                    }
                    else{
                        res.status(500).send({error: err});
                    }
                });
            }
        }
    });
}

module.exports = {
    registro,
    listar,
    get_data,
    add_like,
    listar_likes,
    add_dislike,
    listar_dislikes,
    listar_last
}