import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ProductoService } from "src/app/services/producto.service";
import { CarritoService } from "src/app/services/carrito.service";
import { GLOBAL } from "src/app/services/GLOBAL";
import { CategoriaService } from "src/app/services/categoria.service";
import * as io from "socket.io-client";
import { CongeneralService } from 'src/app/services/congeneral.service';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  public identity;
  public productos : Array<any> = [];
  public filter;
  public carrito : Array<any> = [];
  public url;
  public subtotal : any = 0;
  public categorias : Array<any> = [];
  public data_subcategorias : Array<any> = [];

  public socket = io('http://localhost:4201');

  public opmenu = 1;
  public general: any = {};
  public select_categoria = '';

  constructor(

    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _productoService : ProductoService,
    private _carritoService:CarritoService,
    private _categoriaService :CategoriaService,
    private _congeneralService : CongeneralService
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }
  
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
  }

  search_by_filter(){

    this._router.navigate(['/productos/search/',this.filter]);

    
  }

  show_menu(){
    if(this.opmenu == 1){
      $('#menubar').removeClass('hide-menu');
      $('#menubar').addClass('show-menu');
      this.opmenu = 2;
    }
    else if(this.opmenu == 2){
      $('#menubar').removeClass('show-menu');
      $('#menubar').addClass('hide-menu');
      this.opmenu = 1;
    }
  }

  show_Carrito(){
    this._carritoService.preview_carrito(this.identity._id).subscribe(
      response =>{
        this.carrito = response.carrito;

        this.carrito.forEach(element => {
          this.subtotal = this.subtotal + (element.precio*element.cantidad);
        });
        
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  ngOnInit(): void {
    this._congeneralService.get_data().subscribe(
      response =>{
        this.general = response.data;
      },
      error=>{
        
      }
    );
    if(this.identity){
      this.data_categorias();

      this.socket.on('new-carrito', function (data) {
        this.subtotal = 0;
        this.show_Carrito();

      }.bind(this)); 

      this.url = GLOBAL.url;
      this._route.params.subscribe(
        params=>{
          this.filter = params['filter'];
        }
      )

      this.show_Carrito();

      this._productoService.listar_autocomplete().subscribe(
        response =>{
        
          if(response.data.length >= 1){
            response.data.forEach(element => {
              this.productos.push(element.titulo);
          
              
            });
          }
          
        },
        error=>{

        }
      );
    }else{
      this.data_categorias();
      this.url = GLOBAL.url;
      this._route.params.subscribe(
        params=>{
          this.filter = params['filter'];
        }
      )
    }
    
   
  }

  logout(){
    
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    
    this.identity = null;

    this._router.navigate(['/']);
  }

  remove_producto(id){
    this._carritoService.remove_carrito(id).subscribe(
      response=>{
        this.subtotal = this.subtotal - (response.carrito.precio*response.carrito.cantidad);
        this._carritoService.preview_carrito(this.identity._id).subscribe(
          response =>{
            this.carrito = response.carrito;
            this.socket.emit('save-carrito_dos', {new:true});
           
            
          },
          error=>{
            console.log(error);
            
          }
        );
      },
      error=>{

      }
    );
  }

  data_categorias(){
    this._categoriaService.listar('').subscribe(
      response=>{
        this.categorias = response.categorias; 
    
        response.categorias.forEach(element1 => {
          element1.subcategorias.split(',').forEach(element2 => {
            this.data_subcategorias.push({subcategoria : element2,_id:element1._id});
          });

        });

      },
      error =>{

      }
    );
  }

  select_cat(){
    this._router.navigate(['/productos/'+this.select_categoria+'/subcategoria/todo']);
    
  }

}
