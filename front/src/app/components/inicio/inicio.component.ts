import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { GaleriaService } from 'src/app/services/galeria.service';
import { ColorService } from 'src/app/services/color.service';
import { SelectorService } from 'src/app/services/selector.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { UserService } from 'src/app/services/user.service';
import { CarritoService } from 'src/app/services/carrito.service';
declare let tns;
import * as io from "socket.io-client";
import { MarcaService } from 'src/app/services/marca.service';
import { CongeneralService } from 'src/app/services/congeneral.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare let countdown;

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public identity;
  public best_sellers : Array<any> =[];
  public url;
  public selectores : Array<any> = [];
  public galeria : Array<any> = [];
  public colores : Array<any> = [];
  public first_img;
  public select_producto;
  public socket = io('http://localhost:4201');

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
  public comentarios :Array<any>=[];

  public color_to_cart;
  public cantidad_to_cart = 1;
  public precio_to_cart;
  public selector_to_cart = ' ';
  public err_stock ='';
  public selector_error = false;
  public marcas:Array<any>=[];

  public promocion:any={};
  public categorias :Array<any>=[];

  public productos_best_sellers :Array<any>=[];
  public productos_newest :Array<any>=[];
  public productos_populares :Array<any>=[];

  public last_reviews :Array<any>=[];
  public sliders :Array<any>=[];
  public headers = false;
  
  constructor(
    private _productoService : ProductoService,
    private _galeriaService : GaleriaService,
    private _colorService :ColorService,
    private _selectorService : SelectorService,
    private _comentarioService: ComentarioService,
    private _userSerice : UserService,
    private _carritoService : CarritoService,
    private _marcaService : MarcaService,
    private _congeneralService : CongeneralService,
    private _categoriaService : CategoriaService,
    private _router : Router,
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userSerice.getIdentity();

  }

  ngOnInit(): void {

  
    
    this._productoService.best_seller().subscribe(
      response =>{
        this.best_sellers = response.data;
      }
    );

    this.get_marcas();
    this.data_banner();
    this.data_categorias();
    this.get_slider();

    this._productoService.best_seller().subscribe(
      response =>{
        this.productos_best_sellers = response.data;
      }
    );

    this._productoService.listar_newest().subscribe(
      response =>{
        this.productos_newest = response.data;
      },
      error=>{

      }
    );

    this._productoService.populares().subscribe(
      response =>{
        this.productos_populares = response.data;
      },
      error=>{

      }
    );
    
      this._comentarioService.listar_last().subscribe(
        response =>{
          this.last_reviews = response.data;
        }
      );
       
        
    var slider = tns({
      container: '.cz-carousel-inner',
      items: 1,
      mouseDrag: true,
      controls: false,
      loop:false
    }); 


    var slider2 = tns({ 
      container: '.slider-marcas',
      nav: false, 
      controls: false, 
      autoplay: false, 
      autoplayTimeout: 4000, 
      loop: false, 
      mouseDrag: true,
      responsive: {0:{items:1},360:{items:2},600:{items:3},991:{items:4},1200:{items:4}} 
    }); 

    var slider2 = tns({
      container: '.slider-foot',
      items: 1, 
      mode: 'gallery', 
      nav: false, 
      responsive: {0: {nav: true, controls: false}, 576: {nav: false, controls: true}}});
    
  }

  get_slider(){
 
    this._congeneralService.get_slider().subscribe(
      response =>{
        this.sliders = response.data;
    
      },
      error=>{

      }
    );
  }

  data_countdown(fecha){
    const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
   
    
    let countDown = new Date(fecha).getTime(),
      x = setInterval(function() {    

      let now = new Date().getTime(),
      distance = countDown - now;

      $('#count_dias').text(Math.floor(distance / (day))),
        $('#count_horas').text(Math.floor((distance % (day)) / (hour))),
        $('#count_min').text(Math.floor((distance % (hour)) / (minute))),
        $('#count_seg').text(Math.floor((distance % (minute)) / second))
        
        
      }, second)
  }

  get_color(event,color){
    this.color_to_cart = color.color;
   
  }

  click_img(img,id){
    
    $('.cz-thumblist-item.active').removeClass('active');
    $('#'+id).addClass('active');
    this.first_img = img;
    
  }

  data_banner(){
    this._congeneralService.get_promocion().subscribe(
      response =>{
        this.promocion = response.data
        this.data_countdown(this.promocion.end);
        
        
      },error=>{

      }
    );
  }

  add_to_cart(carritoForm){
    if(this.cantidad_to_cart > this.select_producto.stock){
      this.err_stock = 'La cantidad no debe superar al stock';
    }
    else if(this.cantidad_to_cart <= 0){
      this.err_stock = 'La cantidad no puede ser un valor negativo';
    }
    else{
      this.err_stock = '';
      let data = {
        user: this.identity._id,
        producto : this.select_producto._id,
        cantidad : this.cantidad_to_cart,
        color : this.color_to_cart,
        selector : this.selector_to_cart,
        precio : this.select_producto.precio_ahora
      }
      if(this.selector_to_cart != " "){
        this.selector_error = false;
        this._carritoService.registro(data).subscribe(
          response =>{
            this.socket.emit('save-carrito', {new:true});
            
          },
          error=>{
           
            
          }
        );
      }else{
        this.selector_error = true;
      }
    }
    
  }

  get_marcas(){
    this._marcaService.listar('').subscribe(
      response=>{
        this.marcas = response.marcas;   
       
      },
      error =>{

      }
    );
  }

  get_galeria(item){
    this.galeria = [];
    this.select_producto = item;
   
    
    this._galeriaService.find_by_product(item._id).subscribe(
      response =>{
        this.data_comentarios(item._id);
        this.data_colores(item._id);
        this.data_selectores(item._id);
        this.err_stock = '';
        this.selector_error = false;
        this.color_to_cart;
        this.cantidad_to_cart = 1;
        this.precio_to_cart;
        this.selector_to_cart = ' ';
        response.galeria.forEach((element,index) => {
          if(index == 0){
            this.first_img = element.imagen;
          }
            this.galeria.push({_id:element._id,imagen : element.imagen});
        }); 
      },
      error=>{
      
        
      }
    );
  }

  data_colores(id){
    this._colorService.listar(id).subscribe(
      response =>{
        this.colores = response.colores;
        this.color_to_cart = this.colores[0].color;
      
        
      },
      error=>{

      }
    );
  }

  data_selectores(id){
    this._selectorService.listar(id).subscribe(
      response =>{
        this.selectores = response.selectores;
        
      },
      error=>{

      }
    );
  }

  data_comentarios(id){
    this._comentarioService.get_data(id,"raiting").subscribe(
      response =>{
        
        this.comentarios = response.comentarios;
      
        

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

  data_categorias(){
    this._categoriaService.get_car_slide().subscribe(
      response =>{
        this.categorias = response.categorias;
      },
      error=>{

      }
    );
  }

}
