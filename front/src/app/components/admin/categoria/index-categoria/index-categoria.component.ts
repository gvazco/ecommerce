import { Component, OnInit } from '@angular/core';
import { Categoria } from "../../../../models/Categoria";
import { CategoriaService } from 'src/app/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-categoria',
  templateUrl: './index-categoria.component.html',
  styleUrls: ['./index-categoria.component.css']
})
export class IndexCategoriaComponent implements OnInit {

  public categorias : Array<any> = [];
  public page;
  public pageSize = 15;
  public count_cat;
  public filtro;
  public identity;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _categoriaService : CategoriaService
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.resetSearch();
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
    this._categoriaService.listar('').subscribe(
      response=>{
        this.categorias = response.categorias;
        this.count_cat = this.categorias.length;
        this.page = 1;
        
        
      },
      error =>{

      }
    );
  }

  search(searchForm){
    console.log(this.filtro);
    this._categoriaService.listar(this.filtro).subscribe(
      response=>{
        this.categorias = response.categorias;
        
      },
      error =>{

      }
    );
  }

  eliminar(id){
    this._categoriaService.eliminar(id).subscribe(
      response=>{

        $('#modal-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        $('#dark-toast').removeClass('hide');
        $('#dark-toast').addClass('show');
        setTimeout(function() {
          $("#dark-toast").fadeOut(1500);
      },3000);
        this.resetSearch();
      },
      error=>{
        
      }
    );
  }

  close_toast(){
    $('#dark-toast').removeClass('show');
        $('#dark-toast').addClass('hide');
  }


}
