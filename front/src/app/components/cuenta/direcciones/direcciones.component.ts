import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from "src/app/services/GLOBAL";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Direccion } from "src/app/models/Direccion";
import { DireccionService } from 'src/app/services/direccion.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  public identity;
  public url;
  public paises;
  public data_paises : any = [];
  public direccion = new Direccion('','','','','','','','');
  public msm_error = false;
  public msm_success = false;
  public direcciones : any = {};
  public direccion_data : any = {};
  public msm_success_dos = false;

  constructor(
    private _userService: UserService,
    private _direccionService: DireccionService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity){
      this.direccion_data = {};
      this.identity = this._userService.getIdentity();
      this.url = GLOBAL.url;

      this.http.get('https://restcountries.eu/rest/v2/all').subscribe(
        data => {
          
          this.paises = data;
          this.paises.forEach(element => {
              this.data_paises.push(element.nativeName); 
    
          });
        
        }
      );

      this.listar();
    }else{
      this._router.navigate(['/']);
    }
    
  }
  
  listar(){
    this._direccionService.listar(this.identity._id).subscribe(
      response =>{
        this.direcciones = response.direcciones;
      
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

  onSubmit(direccionForm){
    if(direccionForm.valid){
      let data= {
        nombres_completos : direccionForm.value.nombres_completos,
        direccion : direccionForm.value.direccion,
        referencia : direccionForm.value.referencia,
        pais : direccionForm.value.pais,
        ciudad : direccionForm.value.ciudad,
        zip : direccionForm.value.zip,
        user : this.identity._id,
      }
      this._direccionService.registro(data).subscribe(
        response =>{
          $('#add-address').modal('hide');
          this.direccion = new Direccion('','','','','','','','');
          this.msm_success = true;
          this.listar();
        },  
        error=>{
         
          this.msm_error = true;
          
        }
      );
      
    }else{
      this.msm_error = true;
    }
  }

  close_alert(){
    this.msm_error = false;
    this.msm_success = false;
    this.msm_success_dos = false;
  }

  get_direccion(id){
    this._direccionService.get_direccion(id).subscribe(
      response =>{
        this.direccion_data = response.direccion;
      
      },
      error=>{

      }
    );
  }

  onUpdate(direccionFormUpdate){
    if(direccionFormUpdate.valid){
      let data= {
        nombres_completos : direccionFormUpdate.value.nombres_completos,
        direccion : direccionFormUpdate.value.direccion,
        referencia : direccionFormUpdate.value.referencia,
        pais : direccionFormUpdate.value.pais,
        ciudad : direccionFormUpdate.value.ciudad,
        zip : direccionFormUpdate.value.zip,
        _id:this.direccion_data._id,
        user:this.identity._id
      }
      this._direccionService.update(data).subscribe(
        response =>{
          $('#address-'+this.direccion_data._id).modal('hide');
          this.direccion_data = {};
          this.msm_success_dos = true;
          this.listar();
        },  
        error=>{

          
        }
      );
      
    }else{
    
    }
  }

  eliminar(id){
    this._direccionService.eliminar(id).subscribe(
      response=>{

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.listar();
      },
      error=>{
        
      }
    );
  }
}
