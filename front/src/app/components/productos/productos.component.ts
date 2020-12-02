import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductoService } from "../../services/producto.service";
import { GLOBAL } from "../../services/GLOBAL";
import { SelectorService } from "../../services/selector.service";
import { UserService } from 'src/app/services/user.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from "../../services/marca.service";

import noUiSlider from 'nouislider';
import { HttpClient } from '@angular/common/http';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public selectores;
  public categoria_route;
  public filter_route = '';
  public subcategoria_route;
  public productos : any = [];
  public url;
  public identity;
  public categorias;
  public data_subcategorias : any = [];
  public marcas;
  public filter_marca;

  public page;
  public pageSize = 15;
  public count_cat;

  public collapse = false;

  public min = 0;
  public max = 1000;

  public mode_view;

  public sort = 'date';
  public sort_marca;
  public loading = true;
  public headers;

  constructor(
    private _productoService : ProductoService,
    private _selectorService : SelectorService,
    private _userService: UserService,
    private _categoriaService : CategoriaService,
    private _route : ActivatedRoute,
    private _marcaService : MarcaService,
    private _router : Router,
  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    
   }
  
 

   mode_view_one(){
    this.pageSize = 15;
    this.mode_view = 1;
   }

   mode_view_two(){
     this.pageSize = 10;
     this.mode_view = 2;
   }

   ngAfterViewInit(){

    this.slider_ui();

   }


   slider_ui(){
     
      try {
        var slider : noUiSlider.Instance = <HTMLInputElement>document.getElementById('slider');
          
          noUiSlider.create(slider, {
            start: [0, 1000],
            connect: true,
            range: {
                'min': 0,
                'max': 1000
            },
            tooltips: [true,true],
            
        });
        
          slider.noUiSlider.on('update', function (values) {
            
              $('.cz-range-slider-value-min').val(values[0]);
              $('.cz-range-slider-value-max').val(values[1]);
          });
          $('.noUi-tooltip').css('font-size','11px');
      } catch (error) {
        
      }
   }

   onChangeMarca(event, marca:any){
    this.sort_marca = marca._id;

    this.min = $('.cz-range-slider-value-min').val();
    this.max = $('.cz-range-slider-value-max').val();
    
    if(this.subcategoria_route || this.subcategoria_route){
      this._productoService.cat_by_name(this.categoria_route).subscribe(
        response =>{
          let categoria = response.categoria;

          this._productoService.listar_prices(' ',this.min,this.max,this.subcategoria_route,categoria._id,this.sort,this.sort_marca).subscribe(
            response =>{
              this.productos = response.productos;
              this.loading = false;
            },
            error=>{
            }
          );
          
        },
        error=>{
         
        }
      );
    }else{
      if(this.filter_route == undefined){
        console.log("ver todo");
        this._productoService.listar_prices(' ',this.min,this.max,' ',' ',this.sort,this.sort_marca).subscribe(
          response =>{
            this.productos = response.productos;
            this.loading = false;
          },
          error=>{
            console.log(error);
          }
        );
      }else{
        console.log("ver todo");
        this._productoService.listar_prices(this.filter_route,this.min,this.max,' ',' ',this.sort,this.sort_marca).subscribe(
          response =>{
            this.productos = response.productos;
            this.loading = false;
          },
          error=>{
            console.log(error);
          }
        );
      }
    }
    
  }

   sort_filter(){

    
    this.min = $('.cz-range-slider-value-min').val();
    this.max = $('.cz-range-slider-value-max').val();
    
    if(this.subcategoria_route || this.subcategoria_route){
      this._productoService.cat_by_name(this.categoria_route).subscribe(
        response =>{
          let categoria = response.categoria;

          this._productoService.listar_prices(' ',this.min,this.max,this.subcategoria_route,categoria._id,this.sort,this.sort_marca).subscribe(
            response =>{
              this.productos = response.productos;
              this.loading = false;
            },
            error=>{
            }
          );
          
        },
        error=>{
         
        }
      );
    }else{
      if(this.filter_route == undefined){
        console.log("ver todo");
        this._productoService.listar_prices(' ',this.min,this.max,' ',' ',this.sort,this.sort_marca).subscribe(
          response =>{
            this.productos = response.productos;
            this.loading = false;
          },
          error=>{
            console.log(error);
          }
        );
      }else{
        console.log("ver todo");
      this._productoService.listar_prices(this.filter_route,this.min,this.max,' ',' ',this.sort,this.sort_marca).subscribe(
        response =>{
          this.productos = response.productos;
          this.loading = false;
        },
        error=>{
          console.log(error);
        }
      );
      }
    }

    
   }
   

  ngOnInit(): void {
  
    this.mode_view=1;
    $('.noUi-tooltip').css('font-size', '11px');
    this.listar_marca();
    this.data_categorias();
    this._route.params.subscribe( params=> {
        this.categoria_route=params['categoria'];
        this.subcategoria_route=params['subcategoria'];
        this.filter_route=params['filter'];
       
        if(this.categoria_route && this.subcategoria_route) {
            this.productos=[];
            if(this.subcategoria_route=='todo') {
                this._productoService.listar('').subscribe( response=> {
                    response.productos.forEach(element=> {
                        if(element.categoria.nombre.toLowerCase().trim()==this.categoria_route) {
                            this.productos.push(element);
                            this.count_cat=this.productos.length;
                            this.page=1;
                        }
                    }
                    );
                }
                , error=> {}
                );
            }
            else {
                this._productoService.listar('').subscribe( response=> {
                    response.productos.forEach(element=> {
                        if(element.subcategoria.toLowerCase().trim()==this.subcategoria_route) {
                            if(element.precio_ahora >=this.min && element.precio_ahora <=this.max) {
                                this.productos.push(element);
                                this.count_cat=this.productos.length;
                                this.page=1;
                            }
                        }
                    }
                    );
                }
                , error=> {}
                );
            }
        }
        else {
          
            if(this.filter_route==undefined) {
                this._productoService.listar(' ').subscribe( response=> {
                    this.productos=response.productos;
                    this.count_cat=this.productos.length;
                    this.page=1;
                }
                , error=> {}
                );
            }
            else {
                this._productoService.listar(this.filter_route).subscribe( response=> {
                    console.log(response);
                    this.productos=response.productos;
                    this.count_cat=this.productos.length;
                    this.page=1;
                }
                , error=> {}
                );
            }
        }
    }
    );
    this.slider_ui();
  }

  listar_marca(){
    this._marcaService.listar('').subscribe(
      response=>{
        this.marcas = response.marcas;
      },
      error =>{

      }
    );
  }

  search_marca(searchForm){
    this._marcaService.listar(this.filter_marca).subscribe(
      response=>{
        this.marcas = response.marcas;
      },
      error =>{

      }
    );
  }

  filter_prices(){
    this.min = $('.cz-range-slider-value-min').val();
    this.max = $('.cz-range-slider-value-max').val();
    console.log();
    
    if(this.subcategoria_route || this.subcategoria_route){
      this._productoService.cat_by_name(this.categoria_route).subscribe(
        response =>{
          let categoria = response.categoria;

          this._productoService.listar_prices(' ',this.min,this.max,this.subcategoria_route,categoria._id,this.sort,this.sort_marca).subscribe(
            response =>{
              this.productos = response.productos;
              this.loading = false;
            },
            error=>{
            }
          );
          
        },
        error=>{
         
        }
      );
    }else{
      console.log("ver todo");
      if(this.filter_route == undefined){
        this._productoService.listar_prices(' ',this.min,this.max,' ',' ',this.sort,this.sort_marca).subscribe(
          response =>{
            this.productos = response.productos;
            this.loading = false;
          },
          error=>{
            console.log(error);
          }
        );
      }else{
        this._productoService.listar_prices(this.filter_route,this.min,this.max,' ',' ',this.sort,this.sort_marca).subscribe(
          response =>{
            this.productos = response.productos;
            this.loading = false;
          },
          error=>{
            console.log(error);
          }
        );
      }
    }
    
  }
  

  data_categorias(){
    
    if(this.data_subcategorias.length === 0){
   
      
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
  }
}
