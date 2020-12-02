import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { IngresoService } from 'src/app/services/ingreso.service';

@Component({
  selector: 'app-detalle-ingreso',
  templateUrl: './detalle-ingreso.component.html',
  styleUrls: ['./detalle-ingreso.component.css']
})
export class DetalleIngresoComponent implements OnInit {

  public url;
  public identity;
  public id;
  public ingreso;
  public detalle;

  constructor(
    private _ingresoService : IngresoService,
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService: UserService,
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this._route.params.subscribe(
          params=>{
            this.id = params['id'];
            this._ingresoService.get_data_detalle(this.id).subscribe(
              response=>{
                this.ingreso = response.ingreso;
                this.detalle = response.detalle;
                console.log(response);
                
              },
              error=>{
    
              }
            )
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
