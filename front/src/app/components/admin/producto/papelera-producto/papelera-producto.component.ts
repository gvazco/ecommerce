import { Component, OnInit } from '@angular/core';
import { ProductoService } from "../../../../services/producto.service";
import { GLOBAL } from "../../../../services/GLOBAL";
import { CategoriaService } from "../../../../services/categoria.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-papelera-producto',
  templateUrl: './papelera-producto.component.html',
  styleUrls: ['./papelera-producto.component.css']
})
export class PapeleraProductoComponent implements OnInit {

  public productos;
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
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
          this.url = GLOBAL.url;
 
          this.resetSearch();

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
    this._productoService.listar_papelera('').subscribe(
      response=>{
        this.productos = response.productos;
        this.count_cat = this.productos.length;
        this.page = 1;
        this.search_categoria = '';
        console.log(this.productos);
        
      },
      error =>{

      }
    );
  }

  search(searchForm){
    console.log(this.filtro);
    this._productoService.listar_papelera(this.filtro).subscribe(
      response=>{
        this.productos = response.productos;
        this.count_cat = this.productos.length;
        this.page = 1;

      },
      error =>{

      }
    );
  }

  search_cat(){
    this._productoService.listar_cat_papelera(this.search_categoria).subscribe(
      response=>{
        this.productos = response.productos;
        this.count_cat = this.productos.length;
        this.page = 1;
        this.filtro = '';
      },
      error =>{

      }
    );
  }

  desactivar(id){
    this._productoService.desactivar(id).subscribe(
      response=>{
        $('#mover-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.resetSearch();
      },
      error=>{
        this.msm_error = 'No se pudo activar el producto, vuelva a intenter.'
      }
    )
  }

  close_toast(){
    /* $('#dark-toast').removeClass('show');
        $('#dark-toast').addClass('hide'); */
  } 

}
