'use strict'

var Ticket = require('../models/ticket');
var Mensaje = require('../models/mensaje');

function create_ticket(req,res){
    var data = req.body;
    var ticket = new Ticket();
    ticket.tema = data.tema;
    ticket.user = data.user;
    ticket.venta = data.venta;
    ticket.estado = 1;
    ticket.status = '0';
    
    
    ticket.save((err,ticket_open)=>{
        if(!err){
            if(ticket_open){
                console.log(ticket_open);
                res.status(200).send({
                    ticket: ticket_open,
                });           
            }else{
                res.status(200).send({error: 'No se envió el mensaje, vuelva a intentarlo.'});
            }
        }
        else{
            console.log(err);
            res.status(200).send({error: 'Ocurrió un error en el servidor.'});
        }
    });
}

function get_ticket(req,res){
    var id = req.params['id'];

    Ticket.findOne({_id:id}).exec((err,data_ticket)=>{
        if(!err){
            if(data_ticket){
                res.status(200).send({ticket: data_ticket});
            }else{
                res.status(500).send({error: err});
            }
        }
        else{
            res.status(500).send({error: err});
        }
    });
}

function listar_tickets(req,res){
    var id = req.params['id'];
    Ticket.find({venta:id}).sort({createdAt:-1}).exec((err,data_tickets)=>{
        if(err){
            res.status(500).send({error: err});
        }else{
            if(data_tickets){
                res.status(200).send({tickets: data_tickets});
            }
        }
    });
}

function listar_todos(req,res){
    var status = req.params['status'];
    var estado = req.params['estado'];
    

    var miFechaActual = new Date();
    console.log('dia '+ miFechaActual.getDate());

    if(status == 'null' && estado == 'null'){
        console.log('1');
        Ticket.find().sort({createdAt:-1}).populate('user').exec((err,data_tickets)=>{
            if(err){
                res.status(500).send({error: err});
            }else{
                if(data_tickets){
                    res.status(200).send({tickets: data_tickets});
                }
            }
        });
    }else if(status && estado){
        console.log('2');
        Ticket.find({status:status,estado:estado}).sort({createdAt:-1}).populate('user').exec((err,data_tickets)=>{
            if(err){
                res.status(500).send({error: err});
            }else{
                if(data_tickets){
                    res.status(200).send({tickets: data_tickets});
                }
            }
        });
    }
    
}

function send(req,res){
    var data = req.body;
    
    var mensaje = new Mensaje();
    mensaje.de = data.de;
    mensaje.para = data.para;
    mensaje.msm = data.msm;
    mensaje.ticket = data.ticket;

    if(data.estado == null){
        console.log('status');
        Ticket.findByIdAndUpdate({_id:data.ticket},{status:data.status},(err,ticket_data)=>{
            if(ticket_data){
                console.log(ticket_data);
                mensaje.save((error,mensaje_data)=>{
                    if(!error){
                        if(mensaje_data){
                            res.status(200).send({
                                data: mensaje_data,
                            });           
                        }else{
                            res.status(200).send({error: error});
                        }
                    }
                    else{
                        res.status(200).send({error: error});
                    }
                });
            }
        })
    }
    if(data.estado == 0){
        Ticket.findByIdAndUpdate({_id:data.ticket},{estado:data.estado},(err,ticket_data)=>{
            if(ticket_data){
                console.log(ticket_data);
                mensaje.save((error,mensaje_data)=>{
                    if(!error){
                        if(mensaje_data){
                            res.status(200).send({
                                data: mensaje_data,
                            });           
                        }else{
                            res.status(200).send({error: error});
                        }
                    }
                    else{
                        res.status(200).send({error: error});
                    }
                });
            }
        })
    }
 
    
}

function data_messenger(req,res){

    var de = req.params['de'];
    var para = req.params['para'];
    

    const data = {
        '$or' : [
            { '$and': [
                {
                    'para': de
                },{
                    'de': para
                }
            ]
            },{ 
                '$and': [ 
                    {
                        'para': para
                    }, {
                        'de': de
                    }
                ]
            },
        ]
    };


 
    Mensaje.find(data).sort({createdAt:1}).exec(function(err,messages){
        if(messages){
            res.status(200).send({mensajes: messages});
        }
        else{
            res.status(200).send({error: "No hay ningun mensaje"});
        }
    });
}


module.exports = {
    create_ticket,
    listar_tickets,
    send,
    data_messenger,
    get_ticket,
    listar_todos
}