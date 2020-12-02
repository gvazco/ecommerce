import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from "src/app/services/producto.service";
import { GaleriaService } from "src/app/services/galeria.service";
import { ColorService } from "src/app/services/color.service";
import { SelectorService } from "src/app/services/selector.service";
import { GLOBAL } from "src/app/services/GLOBAL";
import Drift from 'drift-zoom';
import { UserService } from "src/app/services/user.service";
import { CarritoService } from 'src/app/services/carrito.service';
import * as io from "socket.io-client";
import { PostalService } from "src/app/services/postal.service";
import { ComentarioService } from "src/app/services/comentario.service";
import { VentaService } from 'src/app/services/venta.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css']
})
export class ShowProductoComponent implements OnInit {

  public slug;
  public producto : any = {};
  public selectores : any = [];
  public galeria : any = [];
  public colores : any = [];
  public url;
  public img_select;
  public first_img;
  public cantidad_to_cart = 1;
  public precio_to_cart;
  public color_to_cart = '#16537e';
  public selector_to_cart = ' ';
  public err_stock ='';
  public identity;

  public selector_error = false;

  public socket = io('http://localhost:4201');
  public postales;
  public comentarios :any=[];

  /*COMENTARIOS DATA */
  public cinco_estrellas = 0;
  public cuatro_estrellas = 0;
  public tres_estrellas = 0;
  public dos_estrellas = 0;
  public una_estrella = 0;

  public cinco_porcent = 0;
  public cuatro_porcent = 0;
  public tres_porcent = 0;
  public dos_porcent = 0;
  public uno_porcent = 0;
  public raiting_porcent = 0;
  public total_puntos = 0;
  public max_puntos = 0;
  public raiting_puntos= 0;

  /*PAGINATE COMENTS */
  public page;
  public pageSize = 5;
  public count_cat;
  public sort_data_coment = 'raiting';

  /*FORM RESEÑA */
  public id_review_producto;
  public review_comentario='';
  public review_pros='';
  public review_cons='';
  public review_estrellas='';
  public msm_error_review='';

  public get_state_user_producto_coment = false;

  /*NEWST */

  public news_productos : any = {};

  constructor(
    private _route : ActivatedRoute,
    private _productoService : ProductoService,
    private _galeriaService : GaleriaService,
    private _colorService :ColorService,
    private _selectorService : SelectorService,
    private _userSerice : UserService,
    private _postalService :PostalService,
    private _carritoService : CarritoService,
    private _ventaService: VentaService,
    private _comentarioService: ComentarioService,
    private _router : Router,
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userSerice.getIdentity();
  }



  click_img(img,id){
    
    $('.cz-thumblist-item.active').removeClass('active');
    $('#'+id).addClass('active');
    this.first_img = img;
    
  }

  get_color(event,color){
    this.color_to_cart = color.color;
    
    
  }

  sort_coments(){
    this._comentarioService.get_data(this.producto._id,this.sort_data_coment).subscribe(
      response =>{
        
        this.comentarios = response.comentarios;

        this.count_cat = this.comentarios.length;
        this.page = 1;

        this.comentarios.forEach(element => {
          this._comentarioService.get_likes(element._id).subscribe(
            response =>{
              element.likes = response.data.length;
            },
            error=>{

            }
          );

          this._comentarioService.get_dislikes(element._id).subscribe(
            response =>{
              element.dislikes = response.data.length;
            },
            error=>{

            }
          );
        });
        console.log(this.comentarios);
        
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  data_comentarios(){
    this._comentarioService.get_data(this.producto._id,"raiting").subscribe(
      response =>{
        
        this.comentarios = response.comentarios;
        console.log(this.comentarios);
        

        this.count_cat = this.comentarios.length;
        this.page = 1;

        this.comentarios.forEach(element => {
          this._comentarioService.get_likes(element._id).subscribe(
            response =>{
              element.likes = response.data.length;
            },
            error=>{

            }
          );

          this._comentarioService.get_dislikes(element._id).subscribe(
              response =>{
                element.dislikes = response.data.length;
              },
              error=>{

              }
            );
          });
        console.log(this.comentarios);
        

        this.comentarios.forEach((element,index) => {
          if(element.estrellas == 5){
            this.cinco_estrellas = this.cinco_estrellas + 1;
          }
          else if(element.estrellas == 4){
            this.cuatro_estrellas = this.cuatro_estrellas + 1;
          }
          else if(element.estrellas == 3){
            this.tres_estrellas = this.tres_estrellas + 1;
          }
          else if(element.estrellas == 2){
            this.dos_estrellas = this.dos_estrellas + 1;
          }
          else if(element.estrellas == 3){
            this.una_estrella = this.una_estrella + 1;
          }
        });

        this.cinco_porcent = (this.cinco_estrellas*100)/this.comentarios.length;
        this.cuatro_porcent = (this.cuatro_estrellas*100)/this.comentarios.length;
        this.tres_porcent = (this.tres_estrellas*100)/this.comentarios.length;
        this.dos_porcent = (this.dos_estrellas*100)/this.comentarios.length;
        this.uno_porcent = (this.una_estrella*100)/this.comentarios.length;

        /******************************************************************* */

        let puntos_cinco = 0;
        let puntos_cuatro = 0;
        let puntos_tres = 0;
        let puntos_dos = 0;
        let punto_uno = 0;

        puntos_cinco = this.cinco_estrellas * 5;
        puntos_cuatro = this.cuatro_estrellas * 4;
        puntos_tres = this.tres_estrellas * 3;
        puntos_dos = this.dos_estrellas * 2;
        punto_uno = this.una_estrella * 1;

        this.total_puntos = puntos_cinco + puntos_cuatro + puntos_tres + puntos_dos + punto_uno;
        this.max_puntos = this.comentarios.length * 5;

        this.raiting_porcent =(this.total_puntos*100)/this.max_puntos;

        this.raiting_puntos =(this.raiting_porcent*5)/100;

        if(isNaN(this.raiting_puntos)){
          this.raiting_puntos = 0;
        }
        if(isNaN(this.raiting_porcent)){
          this.raiting_porcent = 0;
        }
        
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  listar_newest(){
    this._productoService.listar_newest().subscribe(
      response =>{
        this.news_productos = response.data; 
      },
      error=>{

      }
    );
  }



  ngOnInit(): void {
    
  
    this.socket.on('new-stock', function (data) {
      this.init_data();

    }.bind(this)); 
    
    this.listar_postales();
		new Drift(document.querySelector('#active_img_thumb'), {
			paneContainer: document.querySelector('.cz-image-zoom-pane'),
			inlinePane: 900,
			inlineOffsetY: -85,
			containInline: true,
			hoverBoundingBox: true
    });
    

    this._route.params.subscribe(
      params=>{
        this.slug = params['slug'];
        
        this.init_data();

      }
    );

    this.listar_newest();
   
  }

  init_data(){
    this._productoService.find_by_slug(this.slug).subscribe(
      response =>{
        this.producto = response.producto;
       
        
        if(this.identity){
          this._ventaService.evaluar_venta_user(this.identity._id,this.producto._id).subscribe(
            response =>{
              this.get_state_user_producto_coment = response.data;
            },
            error=>{
      
            }
          );
        }

        this.data_comentarios();

        $('#detalle').html(this.producto.detalle);
        $('#video_iframe').append(this.producto.video_review);
        $('iframe').removeAttr('height');
        $('iframe').attr('height','400px');
        
        
        this.precio_to_cart = this.producto.precio_ahora;
         
        this._galeriaService.find_by_product(this.producto._id).subscribe(
          response =>{
            response.galeria.forEach((element,index) => {
              if(index == 0){
                this.first_img = element.imagen;
              }
                this.galeria.push({_id:element._id,imagen : element.imagen});
            }); 
            console.log(this.galeria);
          },
          error=>{
            console.log(error);
            
          }
        );

        this._colorService.listar(this.producto._id).subscribe(
          response =>{
            this.colores = response.colores;
            this.color_to_cart = this.colores[0].color;
            console.log(this.cantidad_to_cart);
            
          },
          error=>{

          }
        );

        this._selectorService.listar(this.producto._id).subscribe(
          response =>{
            this.selectores = response.selectores;
            
          },
          error=>{

          }
        );
      },
      error=>{

      }
    );
  }

  listar_postales(){
    this._postalService.listar().subscribe(
      response =>{
        this.postales = response.postales
      },
      error=>{

      }
    );
  }

  add_to_cart(carritoForm){
    if(this.cantidad_to_cart > this.producto.stock){
      this.err_stock = 'La cantidad no debe superar al stock';
    }
    else if(this.cantidad_to_cart <= 0){
      this.err_stock = 'La cantidad no puede ser un valor negativo';
    }
    else{
      this.err_stock = '';
      let data = {
        user: this.identity._id,
        producto : this.producto._id,
        cantidad : this.cantidad_to_cart,
        color : this.color_to_cart,
        selector : this.selector_to_cart,
        precio : this.precio_to_cart
      }
      if(this.selector_to_cart != " "){
        this.selector_error = false;
        this._carritoService.registro(data).subscribe(
          response =>{
            this.socket.emit('save-carrito', {new:true});
            $('#dark-toast').removeClass('hide');
            $('#dark-toast').addClass('show');
            setTimeout(function() {
                $("#dark-toast").fadeOut(1500);
            },3000);
          },
          error=>{
  
          }
        );
      }else{
        this.selector_error = true;
      }
    }
    
  }

  add_likes(idcoment){

    let data = {
      comentario : idcoment,
      user : this.identity._id
    }

    this._comentarioService.add_likes(data).subscribe(
      response =>{
        this.comentarios.forEach(element => {
          this._comentarioService.get_likes(element._id).subscribe(
            response =>{
              element.likes = response.data.length;
            },
            error=>{

            }
          );
        });
        
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  add_dislikes(idcoment){

    let data = {
      comentario : idcoment,
      user : this.identity._id
    }

    this._comentarioService.add_dislikes(data).subscribe(
      response =>{
        this.comentarios.forEach(element => {
          this._comentarioService.get_dislikes(element._id).subscribe(
            response =>{
              element.dislikes = response.data.length;
            },
            error=>{

            }
          );
        });
        
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  saveComent(reviewForm){
    if(reviewForm.valid){
      
      let data = {
        comentario: reviewForm.value.review_comentario,
        pros: reviewForm.value.review_pros,
        cons: reviewForm.value.review_cons,
        estrellas: reviewForm.value.review_estrellas,
        user: this.identity._id,
        producto: this.producto._id,
      }
      this._comentarioService.registro(data).subscribe(
        response =>{
          this.msm_error_review = '';
          this.id_review_producto='';
          this.review_comentario='';
          this.review_pros='';
          this.review_cons='';
          this.review_estrellas='';
        },
        error=>{
          this.msm_error_review = error.error.message;
          this.id_review_producto='';
          this.review_comentario='';
          this.review_pros='';
          this.review_cons='';
          this.review_estrellas='';
        }
      );
      
    }else{
      this.msm_error_review = 'Complete correctamente los campos.';
    }
  }

  
  close_alert(){
    this.msm_error_review = '';
    
  }

  close_toast(){
    $('#dark-toast').removeClass('show');
        $('#dark-toast').addClass('hide');
  }
}
