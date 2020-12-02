import { Component, OnInit } from '@angular/core';
import { GLOBAL } from "src/app/services/GLOBAL";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VentaService } from "src/app/services/venta.service";
import { ComentarioService } from "src/app/services/comentario.service";
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-detalleventas',
  templateUrl: './admin-detalleventas.component.html',
  styleUrls: ['./admin-detalleventas.component.css']
})
export class AdminDetalleventasComponent implements OnInit {

  public identity;
  public id;
  public detalle : any = {};
  public venta : any = {};
  public url;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private _ventaService: VentaService,
    private _comentarioService : ComentarioService,
    private _productoService : ProductoService,
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.url = GLOBAL.url;

        this._route.params.subscribe(
          params=>{
            this.id = params['id'];
            
          }
        );

        this._ventaService.detalle(this.id).subscribe(
          response =>{
            this.detalle = response.detalle;
            this.venta = response.venta;
            console.log(this.detalle);
            
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

}
