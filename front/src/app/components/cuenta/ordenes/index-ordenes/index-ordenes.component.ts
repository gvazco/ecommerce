import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from "src/app/services/GLOBAL";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VentaService } from "src/app/services/venta.service";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-ordenes',
  templateUrl: './index-ordenes.component.html',
  styleUrls: ['./index-ordenes.component.css']
})
export class IndexOrdenesComponent implements OnInit {

  public identity;
  public url;
  public msm_error = false;
  public msm_success = false;
  public ordenes;
  public ventas;
  public indice;

  public page;
  public pageSize = 10;
  public count_cat;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private _ventaService: VentaService
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {

    if(this.identity){
      this.listar_ordenes();
      this.url = GLOBAL.url;
    }else{
      this._router.navigate(['/']);
    }
  
  }

  listar_ordenes(){
    this._ventaService.listar(this.identity._id).subscribe(
      response=>{
      
        
        this.ventas = response.venta;
        this.ordenes = response.detalle;

        this.count_cat = this.ventas.length;
        this.page = 1;
      },
      error=>{

      }
    );
  }

  

  logout(){
    
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    
    this.identity = null;

    this._router.navigate(['/']);
  }
}
