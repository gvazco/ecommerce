import { Component, OnInit } from '@angular/core';
import { VentaService } from "src/app/services/venta.service";
import { ComentarioService } from 'src/app/services/comentario.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-index-cancelacion',
  templateUrl: './index-cancelacion.component.html',
  styleUrls: ['./index-cancelacion.component.css']
})
export class IndexCancelacionComponent implements OnInit {

  public cancelaciones : Array<any> = [];
  public identity;
  public url;
  public filtro = '';
  public page;
  public pageSize = 30;
  public count_cat;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private _ventaService: VentaService,
    private _comentarioService : ComentarioService
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.url = GLOBAL.url;
        this.listar();
      }
      else{
        this._router.navigate(['/']);
      }
    }else{
      this._router.navigate(['/']);
    }
   
  }

  filtro_listar(filtro){
    this._ventaService.listar_cancelacion(this.filtro).subscribe(
      response =>{
        this.cancelaciones = response.cancelaciones;
        this.count_cat = this.cancelaciones.length;
        this.page = 1;
        
        
      },
      error=>{

      }
    );
  }

  listar(){
    this._ventaService.listar_cancelacion(' ').subscribe(
      response =>{
        this.cancelaciones = response.cancelaciones;
        this.count_cat = this.cancelaciones.length;
        this.page = 1;
        
        
      },
      error=>{

      }
    );
  }

}
