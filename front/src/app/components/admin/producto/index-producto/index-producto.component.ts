import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from "../../../../services/producto.service";
import { GLOBAL } from "../../../../services/GLOBAL";
import { CategoriaService } from "../../../../services/categoria.service";
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public productos : Array<any> = [];
  public page;
  public pageSize = 15;
  public count_cat;
  public filtro;
  public url;
  public categorias;
  public search_categoria = '';
  public msm_error;
  public identity;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _productoService : ProductoService,
    private _categoriaService : CategoriaService,
  
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        
 
        this._productoService.listar_admin('').subscribe(
          response=>{
            this.productos = response.productos;
            this.count_cat = this.productos.length;

            this.page = 1;
      
            
          },
          error =>{
    
          }
        );

        this._categoriaService.listar("").subscribe(
          response=>{
            this.categorias = response.categorias;   
          },
          error=>{

          }
        );
      }
      else{
        this._router.navigate(['/']);
      }
    }else{
      this._router.navigate(['/']);
    }
    
    
  }

  resetSearch(){
    this.filtro = ''
    this._productoService.listar_admin('').subscribe(
      response=>{
        this.productos = response.productos;
   
        this.search_categoria = '';
        
      },
      error =>{

      }
    );
  }

  search(searchForm){
   
    this._productoService.listar_admin(this.filtro).subscribe(
      response=>{
        this.productos = response.productos;
        

      },
      error =>{

      }
    );
  }

  search_cat(){
    this._productoService.listar_cat(this.search_categoria).subscribe(
      response=>{
        this.productos = response.productos;
 
        this.filtro = '';
      },
      error =>{
        
        
      }
    );
  }

  desactivar(id){
    this._productoService.desactivar(id).subscribe(
      response=>{
        $('#desactivar-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.resetSearch();
      },
      error=>{
        this.msm_error = 'No se pudo desactivar el producto, vuelva a intenter.'
      }
    )
  }

  activar(id){
    this._productoService.activar(id).subscribe(
      response=>{
        this.resetSearch();
        $('#activar-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
      },
      error=>{
    
        
        this.msm_error = 'No se pudo activar el producto, vuelva a intenter.'
      }
    )
  }

  papelera(id){
    this._productoService.papelera(id).subscribe(
      response=>{
        $('#papelera-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.resetSearch();
      },
      error=>{
        this.msm_error = 'No se pudo mover a papelera el producto, vuelva a intenter.'
      }
    )
  }

 /*  eliminar(id){
    this._productoService.eliminar(id).subscribe(
      response=>{

        $('#modal-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        $('#dark-toast').removeClass('hide');
        $('#dark-toast').addClass('show');
        this.resetSearch();
      },
      error=>{
        
      }
    );
  }*/

  close_toast(){
    /* $('#dark-toast').removeClass('show');
        $('#dark-toast').addClass('hide'); */
  } 

}
