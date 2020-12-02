import { Component, OnInit } from '@angular/core';
import { IngresoService } from 'src/app/services/ingreso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-ingreso',
  templateUrl: './index-ingreso.component.html',
  styleUrls: ['./index-ingreso.component.css']
})
export class IndexIngresoComponent implements OnInit {

  public mydate = new Date();
  public identity;
  public url;
  public filtro;
  public dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  public mes = 0;
  public dia = 0;
  public orden = 'fecha+';
  public codigo = '';
  public year ; 

  public ingresos : any =[];
  public tipo; 

  public track;
  public msm_error_track = false;

  public data_ids : any = [];
  public count_selects=false;

  public page;
  public pageSize = 15;
  public count_cat;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _ingresoervice : IngresoService
  ) {
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        
        this.year = this.mydate.getFullYear();
        this._ingresoervice.init_data().subscribe(
          response=>{
            this.ingresos = response.data;   
 
            this.count_cat = this.ingresos.length;
            this.page = 1;
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

  pills(id){
    if(id == 'home1'){
      $('#home1').addClass('show active');
      $('#messages1').removeClass('show active');
    }
    else if(id == 'messages1'){
      $('#home1').removeClass('show active');
      $('#messages1').addClass('show active');
    }
  }

  init_data(){
    this.search(null,null);
  }

  search(tipe,orden){
    var sortby;
   
    if(orden == null){
      sortby = 'fecha+';
    }
    else{
      sortby = orden;
    }

    if(tipe == null && orden == null){

      this._ingresoervice.get_data_venta_admin(null,null,null).subscribe(
        response=>{
          this.ingresos = response.data;   
          this.orden = 'fecha+';
          
          this.count_cat = this.ingresos.length;
        this.page = 1;
          
        },
        error=>{
  
        }
      );
    }else{
      
      if(tipe == undefined){

        this._ingresoervice.get_data_venta_admin(null,sortby,null).subscribe(
          response=>{
            this.ingresos = response.data;  
            this.orden = 'fecha+';
           
            this.count_cat = this.ingresos.length;
        this.page = 1;
          },
          error=>{
    
          }
        );
      }
      if(tipe == 'fecha'){
        let search = this.year+'-'+this.dia+'-'+this.mes;
        this._ingresoervice.get_data_venta_admin(search,sortby,tipe).subscribe(
          response=>{
            this.tipo = 'fecha';
            this.ingresos = response.data; 
         
            this.count_cat = this.ingresos.length;
        this.page = 1;
          },
          error=>{
  
          }
        );
      }
      else if(tipe == 'codigo'){
        console.log(this.codigo);
        
        this._ingresoervice.get_data_venta_admin(this.codigo,sortby,tipe).subscribe(
          response=>{
            console.log(response);
            
            this.tipo = 'codigo';
            this.ingresos = response.data;
         
            this.count_cat = this.ingresos.length;
            this.page = 1;
          },
          error=>{
  
          }
        );
      }
    }

  }

  close_alert(){
    this.msm_error_track = false;
  }

}
