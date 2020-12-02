'use strict'

var Producto = require('../models/producto');
var Categoria = require('../models/categoria');
var fs = require('fs');
var path = require('path');

function listar_admin(req,res){
    console.log("admin");
    var filtro = req.params['filtro'];
    Producto.find({titulo:new RegExp(filtro,'i'),
    status:['Activo','Desactivado','Edición'],
    },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(producto_data){
                res.status(200).send({productos: producto_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });
}

function find_by_slug(req,res){
    var slug = req.params['slug'];

    Producto.findOne({slug:slug}).exec((err,producto_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });
}

function listar_newest(req,res){
    Producto.find().sort({createdAt:-1}).limit(4).exec((err,data)=>{
        if(data){
            res.status(200).send({data:data});
        }
    });
}

function listar_best_sellers(req,res){
    Producto.find().sort({ventas:-1}).limit(8).exec((err,data)=>{
        if(data){
            res.status(200).send({data:data});
        }
    });
}

function listar_populares(req,res){
    Producto.find().sort({stars:-1}).limit(4).exec((err,data)=>{
        if(data){
            res.status(200).send({data:data});
        }
    });
}

function listar(req,res){
    var filtro = req.params['filtro'];
    var min = req.params['min'];
    var max = req.params['max'];
    var sub = req.params['sub'];
    var cat = req.params['cat'];
    var orden = req.params['orden'];
    var marca = req.params['marca'];
     
    
    if(min == undefined){
        min = 0;
    }
    if(max == undefined){
        max = 1000;
    }

    console.log(marca);
    
    // /productos
    if(sub == undefined || sub == ' '){
        console.log('1');
        
        if(orden == 'asc'){
            if(marca == 'undefined'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
            
                },).populate('marca').populate('categoria').sort({titulo: 1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                        
                            
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }else{
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
                marca : marca
                },).populate('marca').populate('categoria').sort({titulo: 1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                           
                            
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
        }
        else if(orden == 'desc'){
            if(marca == 'undefined'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
                },).populate('marca').populate('categoria').sort({titulo: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
            else{
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
                marca : marca
                },).populate('marca').populate('categoria').sort({titulo: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
        }
        else if(orden == 'rating'){
            if(marca == 'undefined'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
                },).populate('marca').populate('categoria').sort({rating: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
            else{
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
                marca : marca
                },).populate('marca').populate('categoria').sort({rating: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
        }
        else if(orden == 'lower'){
            if(marca == 'undefined'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
                },).populate('marca').populate('categoria').sort({precio_ahora: 1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }else{
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
                marca : marca
                },).populate('marca').populate('categoria').sort({precio_ahora: 1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
        }
        else if(orden == 'major'){
            if(marca == 'undefined'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
                },).populate('marca').populate('categoria').sort({precio_ahora: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }else{
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max } ,
                marca : marca
                },).populate('marca').populate('categoria').sort({precio_ahora: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
        }
        else if(orden == 'date'){
           
            if(marca == 'undefined'){
                console.log("marc unde");
                
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                
                },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
            else{
               
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                marca:marca
                },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
        }else{
            console.log("todoooooo");
            console.log(filtro);
            Producto.find({titulo:new RegExp(filtro,'i'),
            status:['Activo'],
            precio_ahora:{ $gte:min, $lte: max },
         
            },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
                if(err){
                    res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                }else{
                    if(producto_data){
                        res.status(200).send({productos: producto_data});
                       
                    }else{
                        res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                    }
                }
            });
        }
    }
    else{
        console.log('subcategorias');
        
        if(sub == "todo"){
            console.log(orden);
            
            if(orden == 'asc'){
                console.log('asc sort');
                if(marca == 'undefined'){
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                
                    },).populate('marca').populate('categoria').sort({titulo: 1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }
                else{
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                    marca: marca
                    },).populate('marca').populate('categoria').sort({titulo: 1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }
            }
            else if(orden == 'desc'){
                if(marca == 'undefined'){
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
           
                    },).populate('marca').populate('categoria').sort({titulo: -1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }else{
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                    marca: marca
                    },).populate('marca').populate('categoria').sort({titulo: -1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }
            }
            else if(orden == 'rating'){
                if(marca == 'undefined'){
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                    },).populate('marca').populate('categoria').sort({rating: -1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }else{
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                    marca: marca
                    },).populate('marca').populate('categoria').sort({rating: -1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }
            }
            else if(orden == 'lower'){
                if(marca == 'undefined'){
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                    },).populate('marca').populate('categoria').sort({precio_ahora: 1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }
                else{
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                    marca: marca
                    },).populate('marca').populate('categoria').sort({precio_ahora: 1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }
            }
            else if(orden == 'major'){
                if(marca == 'undefined'){
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                    },).populate('marca').populate('categoria').sort({precio_ahora: -1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }else{
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                    marca: marca
                    },).populate('marca').populate('categoria').sort({precio_ahora: -1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }
            }
            else if(orden == 'date'){
                if(marca == 'undefined'){
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat
                    },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }else{
                    Producto.find({titulo:new RegExp(filtro,'i'),
                    status:['Activo'],
                    precio_ahora:{ $gte:min, $lte: max },
                    categoria : cat,
                    marca: marca
                    },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
                        if(err){
                            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                        }else{
                            if(producto_data){
                                res.status(200).send({productos: producto_data});
                            }else{
                                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                            }
                        }
                    });
                }
            }
            else{
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                categoria : cat
                },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
        }
        else{
            if(orden == 'asc'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                subcategoria : new RegExp(sub,'i')
                },).populate('marca').populate('categoria').sort({titulo: 1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
            else if(orden == 'desc'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                subcategoria : new RegExp(sub,'i')
                },).populate('marca').populate('categoria').sort({titulo: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
            else if(orden == 'rating'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                subcategoria : new RegExp(sub,'i')
                },).populate('marca').populate('categoria').sort({rating: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
            else if(orden == 'lower'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                subcategoria : new RegExp(sub,'i')
                },).populate('marca').populate('categoria').sort({precio_ahora: 1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
            else if(orden == 'major'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                subcategoria : new RegExp(sub,'i')
                },).populate('marca').populate('categoria').sort({precio_ahora: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
            else if(orden == 'date'){
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                subcategoria : new RegExp(sub,'i')
                },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
            else{
                Producto.find({titulo:new RegExp(filtro,'i'),
                status:['Activo'],
                precio_ahora:{ $gte:min, $lte: max },
                subcategoria : new RegExp(sub,'i')
                },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_data){
                            res.status(200).send({productos: producto_data});
                        }else{
                            res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
                        }
                    }
                });
            }
        }

        
    }

    
}

function listar_autocomplete(req,res){

    Producto.find({
    status:['Activo'],
    },).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(producto_data){
                res.status(200).send({data: producto_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });
}

function listar_general_data(req,res){
    var filtro = req.params['filtro'];
    
    Producto.find({titulo:new RegExp(filtro,'i')}).populate('marca').populate('categoria').sort({createdAt: -1}).exec((err,producto_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(producto_data){
                console.log(producto_data);
                res.status(200).send({data: producto_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });
}

function cat_by_name(req,res){
    var nombre = req.params['nombre'];
    
    Categoria.findOne({nombre:new RegExp(nombre,'i')}).exec((err,categoria_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(categoria_data){
            
                res.status(200).send({categoria: categoria_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });
}

function listar_papelera(req,res){

    var search = req.params['search'];

    Producto.find({titulo:new RegExp(search,'i'),status:'Papelera'}).populate('marca').populate('categoria').exec((err,producto_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(producto_data){
                console.log(producto_data);
                
                res.status(200).send({productos: producto_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });
}

function list_one(req,res){
    var id = req.params['id'];

    Producto.findOne({_id:id}).exec((err,producto_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });

}

function listar_cat(req,res){
    var filtro = req.params['filtro'];

    Producto.find({categoria:filtro,status:['Activo','Desactivado','Edición']}).populate('marca').populate('categoria').exec((err,producto_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(producto_data){
                res.status(200).send({productos: producto_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });
}

function listar_cat_papelera(req,res){
    var filtro = req.params['filtro'];

    Producto.find({categoria:filtro,status:['Papelera']}).populate('marca').populate('categoria').exec((err,producto_data)=>{
        if(err){
            res.status(500).send({message: 'Ocurrió un error en el servidor.'});
        }else{
            if(producto_data){
                res.status(200).send({productos: producto_data});
            }else{
                res.status(500).send({message: 'No se encontró ningun dato en esta sección.'});
            }
        }
    });
}

function registro(req,res){
    var data = req.body;
    
    var img_banner = req.files.poster.originalFilename;

    console.log(data.titulo);
    
    if(img_banner != ""){
        
        var imagen_path = req.files.poster.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];
    
        var producto = new Producto;
        producto.titulo = data.titulo;
        producto.slug = data.titulo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_").toLowerCase();
        producto.video_review = data.video_review;
        producto.precio_ahora = data.precio_ahora;
        producto.precio_antes = data.precio_antes;
        producto.info_short = data.info_short;
        producto.detalle = data.detalle;
        producto.stock = data.stock;
        producto.categoria = data.categoria;
        producto.subcategoria = data.subcategoria;
        producto.marca = data.marca;
        producto.nombre_selector = data.nombre_selector;
        producto.stars = 5;
        producto.ventas = 0;
        producto.status = 'Edición';
        producto.poster = imagen_name;

        Producto.find({titulo:data.titulo},(err,producto_data)=>{
            if(producto_data.length != 0){
                console.log(producto_data);
                res.status(500).send({message: 'El titulo del producto ya existe, vuelve a intentar con otro.'});
            }else{
                producto.save((err,producto_save)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_save){
                            res.status(200).send({producto: producto_save});
                        }else{
                            res.status(403).send({message: 'No se registro el producto, vuelva a intentar nuevamente.'}); 
                        }
                    }
                });
            }
        })

    }else{

        var producto = new Producto;
        producto.titulo = data.titulo;
        producto.slug = data.titulo.replace(/[\. ,:-]+/g, "_").toLowerCase();
        producto.video_review = data.video_review;
        producto.precio_ahora = data.precio_ahora;
        producto.precio_antes = data.precio_antes;
        producto.info_short = data.info_short;
        producto.detalle = data.detalle;
        producto.stock = data.stock;
        producto.categoria = data.categoria;
        producto.subcategoria = data.subcategoria;
        producto.marca = data.marca;
        producto.nombre_selector = data.nombre_selector;
        producto.status = 'Edición';
        producto.poster = null;
        producto.stars = 5;
        Producto.find({titulo:data.titulo},(err,producto_data)=>{
            if(producto_data.length != 0){
                res.status(500).send({message: 'El titulo del producto ya existe, vuelve a intentar con otro.'});
            }else{
                producto.save((err,producto_save)=>{
                    if(err){
                        res.status(500).send({message: 'Ocurrió un error en el servidor.'});
                    }else{
                        if(producto_save){
                            res.status(200).send({producto: producto_save});
                        }else{
                            res.status(403).send({message: 'No se registro el producto, vuelva a intentar nuevamente.'}); 
                        }
                    }
                });
            }
        })
 
    }
}

function actualizar(req,res){
    var data = req.body;
    
    var img_banner = req.files.poster;
    var id = req.params['id'];
    var poster = req.params['poster'];
    
    if(img_banner != null){
        console.log("sii");
        
        fs.stat('./uploads/productos/'+poster, function(err) {
            if (!err) {
                fs.unlink('./uploads/productos/'+poster, (err)=>{
                    if(err) throw err;
                });
            }else{
                console.log(poster);
                
            }
        });
        
        var imagen_path = req.files.poster.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

    
        Producto.findByIdAndUpdate({_id:id},{titulo: data.titulo,video_review:data.video_review,precio_ahora:data.precio_ahora,precio_antes:data.precio_antes,info_short:data.info_short,detalle:data.detalle,categoria:data.categoria,subcategoria:data.subcategoria,marca:data.marca,nombre_selector:data.nombre_selector,poster:imagen_name},(err,producto_save)=>{
            if(err){
                res.status(500).send({message: err});
            }else{
                if(producto_save){
                    res.status(200).send({producto: producto_save});
                }else{
                    res.status(403).send({message: 'No se registro el producto, vuelva a intentar nuevamente.'}); 
                }
            }
        });
    }else{
        console.log("noo");
        
        Producto.findByIdAndUpdate({_id:id},{titulo: data.titulo,video_review:data.video_review,precio_ahora:data.precio_ahora,precio_antes:data.precio_antes,info_short:data.info_short,detalle:data.detalle,categoria:data.categoria,subcategoria:data.subcategoria,marca:data.marca,nombre_selector:data.nombre_selector},(err,producto_save)=>{
            if(err){
                res.status(500).send({message: err});
            }else{
                if(producto_save){
                    res.status(200).send({producto: producto_save});
                }else{
                    res.status(403).send({message: 'No se registro el producto, vuelva a intentar nuevamente.'}); 
                }
            }
        });
    }
}

function get_img(req,res) {  
    var img = req.params['img'];


    if(img != "null"|| img != 'undefined'){
        fs.stat('./uploads/productos/'+img, function(err) {
            if (!err) {
                let path_img = './uploads/productos/'+ img;
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

function desactivar(req,res){
    var id = req.params['id'];

    Producto.findByIdAndUpdate({_id:id},{status : 'Desactivado'},(err,producto_data)=>{
        if(err){
            res.status(500).send({message: err});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(403).send({message: 'No se actualizó el producto, vuelva a intentar nuevamente.'}); 
            }
        }
    })
}

function activar(req,res){
    var id = req.params['id'];
    console.log(id);
    Producto.findByIdAndUpdate({_id:id},{status : 'Activo'},(err,producto_data)=>{
        if(err){
            res.status(500).send({message: err});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(403).send({message: 'No se actualizó el producto, vuelva a intentar nuevamente.'}); 
            }
        }
    })
}

function papelera(req,res){
    var id = req.params['id'];

    Producto.findByIdAndUpdate({_id:id},{status : 'Papelera'},(err,producto_data)=>{
        if(err){
            res.status(500).send({message: err});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(403).send({message: 'No se actualizó el producto, vuelva a intentar nuevamente.'}); 
            }
        }
    })
}

function reducir_stock(req,res){
    var id = req.params['id'];
    var cantidad = req.params['cantidad'];

    Producto.findById({_id:id},(err,producto)=>{
       
        if(producto){
            Producto.findByIdAndUpdate({_id:id},{stock: parseInt(producto.stock) - parseInt(cantidad)},(err,data)=>{
                if(data){
                    console.log(data);
                    res.status(200).send({data:data});
                }
                else{
                    console.log(err);
                }
            })
        }
    })
}

function aumentar_stock(req,res){
    var id = req.params['id'];
    var cantidad = req.params['cantidad'];

    Producto.findById({_id:id},(err,producto)=>{
       
        if(producto){
            Producto.findByIdAndUpdate({_id:id},{stock: parseInt(producto.stock) + parseInt(cantidad)},(err,data)=>{
                if(data){
                    console.log(data);
                    res.status(200).send({data:data});
                }
                else{
                    console.log(err);
                }
            })
        }
    })
}

function aumentar_venta(req,res){
    var id = req.params['id'];

    Producto.findById({_id:id},(err,producto)=>{
       
        if(producto){
            Producto.findByIdAndUpdate({_id:id},{ventas: parseInt(producto.ventas) + 1},(err,data)=>{
                if(data){
                    console.log(data);
                    res.status(200).send({data:data});
                }
                else{
                    console.log(err);
                }
            })
        }
    })
}

module.exports = {
    registro,
    listar,
    get_img,
    listar_cat,
    actualizar,
    list_one,
    desactivar,
    activar,
    listar_papelera,
    listar_cat_papelera,
    papelera,
    cat_by_name,
    listar_admin,
    listar_autocomplete,
    find_by_slug,
    listar_newest,
    reducir_stock,
    aumentar_stock,
    aumentar_venta,
    listar_best_sellers,
    listar_populares,
    listar_general_data
}