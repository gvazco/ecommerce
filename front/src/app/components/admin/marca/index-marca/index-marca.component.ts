import { Component, OnInit } from '@angular/core';
import { Marca } from "../../../../models/Marca";
import { MarcaService } from "../../../../services/marca.service";
import { GLOBAL } from "../../../../services/GLOBAL";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-marca',
  templateUrl: './index-marca.component.html',
  styleUrls: ['./index-marca.component.css']
})
export class IndexMarcaComponent implements OnInit {

  public marcas : Array<any> = [];
  public page;
  public pageSize = 15;
  public count_cat;
  public filtro;
  public url;
  public identity;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _marcaService : MarcaService
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.url = GLOBAL.url;
 
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
    this._marcaService.listar('').subscribe(
      response=>{
        this.marcas = response.marcas;
        this.count_cat = this.marcas.length;
        this.page = 1;

       
        
      },
      error =>{

      }
    );
  }

  search(searchForm){
  
    this._marcaService.listar(this.filtro).subscribe(
      response=>{
        this.marcas = response.marcas;
        this.count_cat = this.marcas.length;
        this.page = 1;

      },
      error =>{

      }
    );
  }

  eliminar(id){
    this._marcaService.eliminar(id).subscribe(
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
  }

  close_toast(){
    $('#dark-toast').removeClass('show');
        $('#dark-toast').addClass('hide');
  }

}
