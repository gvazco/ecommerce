import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VentaService } from 'src/app/services/venta.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-admin-ventas',
  templateUrl: './admin-ventas.component.html',
  styleUrls: ['./admin-ventas.component.css']
})
export class AdminVentasComponent implements OnInit {
  public mydate = new Date();
  public identity;
  public filtro;
  public dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  public mes = 0;
  public dia = 0;
  public orden = 'fecha+';
  public estado = 'Venta en proceso';
  public codigo = '';
  public year; 
  public url;

  public ventas : Array<any> =[];
  public tipo; 

  public track;
  public msm_error_track = false;
  public data_view = 1;

  public data_ids : any = [];
  public count_selects=false;

  public page;
  public pageSize = 15;
  public count_cat;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _ventaService : VentaService
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
    
  }

  method_data_view(val){
    if(val == 1){
      this.data_view = 1;
      $('#btn-uno').removeClass('btn-secondary');
      $('#btn-uno').addClass('btn-dark');

      $('#btn-dos').removeClass('btn-dark');
      $('#btn-dos').addClass('btn-secondary');
    }else if(val == 2){
      this.data_view = 2;
     
      $('#btn-dos').removeClass('btn-secondary');
      $('#btn-dos').addClass('btn-dark');

      $('#btn-uno').removeClass('btn-dark');
      $('#btn-uno').addClass('btn-secondary');
    }
  }

  ngOnInit(): void {
    
    
    
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        
        this.method_data_view(1);
        this.year = this.mydate.getFullYear();
        this._ventaService.init_data_admin().subscribe(
          response=>{
            this.ventas = response.data;   
            this.count_cat = this.ventas.length;
            this.page = 1;
            console.log(this.ventas);
            
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

  filtro_listar(filtro){

  }

  pills(id){
    if(id == 'home1'){
      $('#home1').addClass('show active');
      $('#profile1').removeClass('show active');
      $('#messages1').removeClass('show active');
    }
    else if(id == 'profile1'){
      $('#home1').removeClass('show active');
      $('#profile1').addClass('show active');
      $('#messages1').removeClass('show active');
    }
    else if(id == 'messages1'){
      $('#home1').removeClass('show active');
      $('#profile1').removeClass('show active');
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

      this._ventaService.get_data_venta_admin(null,null,null).subscribe(
        response=>{
          this.ventas = response.data;   
          this.orden = 'fecha+';
          this.ventas.forEach(element => {
              element.checked = false;
          });
          this.count_cat = this.ventas.length;
        this.page = 1;
          
        },
        error=>{
  
        }
      );
    }else{
      
      if(tipe == undefined){

        this._ventaService.get_data_venta_admin(null,sortby,null).subscribe(
          response=>{
            this.ventas = response.data;  
            this.orden = 'fecha+';
            this.ventas.forEach(element => {
                element.checked = false;
            });
            this.count_cat = this.ventas.length;
        this.page = 1;
          },
          error=>{
    
          }
        );
      }
      if(tipe == 'fecha'){
        let search = this.year+'-'+this.dia+'-'+this.mes;
        this._ventaService.get_data_venta_admin(search,sortby,tipe).subscribe(
          response=>{
            this.tipo = 'fecha';
            this.ventas = response.data; 
            this.ventas.forEach(element => {
                element.checked = false;
            });
            this.count_cat = this.ventas.length;
        this.page = 1;
          },
          error=>{
  
          }
        );
      }
      else if(tipe == 'estado'){
        this._ventaService.get_data_venta_admin(this.estado,sortby,tipe).subscribe(
          response=>{
            this.tipo = 'estado';
            this.ventas = response.data;  
            this.ventas.forEach(element => {
                element.checked = false;
            });
            this.count_cat = this.ventas.length;
            this.page = 1;      
          },
          error=>{
  
          }
        );
      }
      else if(tipe == 'codigo'){
        this._ventaService.get_data_venta_admin(this.codigo,sortby,tipe).subscribe(
          response=>{
            this.tipo = 'codigo';
            this.ventas = response.data;
            this.ventas.forEach(element => {
                element.checked = false;
            });
            this.count_cat = this.ventas.length;
        this.page = 1;
          },
          error=>{
  
          }
        );
      }
    }
    
    
  }

  setTrack(trackForm,id){
    if(trackForm.valid){
      let data = {
        tracking_number : trackForm.value.track
      }
      this._ventaService.set_track(id,data).subscribe(
        response =>{
          this.search(null,null);
          this.track = '';
          $('#trak-'+id).modal('hide');
          $('.modal-backdrop').removeClass('show');
        },error=>{

        }
      );
    }else{
      this.msm_error_track = true;
    }
  }

  close_alert(){
    this.msm_error_track = false;
  }


  imprimir_factura(){
    
  }

  select_id(){
    this.count_selects = false;
    this.ventas.forEach(element => {
      if(element.checked){
        this.count_selects = true;
      }
    }); 
  }

  update_envio(){
    this.ventas.forEach(element => {
      if(element.checked){
        this._ventaService.update_envio(element._id).subscribe(
          response =>{

          },
          error=>{
            console.log(error);
            
          }
        );
      }
    });
    this.search(null,null);
    this.count_selects = false;
  }

}
