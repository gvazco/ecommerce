import { Component, OnInit } from '@angular/core';
import { Postal } from "src/app/models/Postal";
import { PostalService } from "src/app/services/postal.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-postal',
  templateUrl: './postal.component.html',
  styleUrls: ['./postal.component.css']
})
export class PostalComponent implements OnInit {

  public postal = new Postal('','','','',null);
  public msm_error = '';
  public postales;
  public identity;

  constructor(
    private _postalService : PostalService,
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.listar();
      }
      else{
        this._router.navigate(['/']);
      }
    }else{
      this._router.navigate(['/']);
    }
    
  }

  onSubmit(postalForm){
    if(postalForm.valid){
      let data = {
        titulo : postalForm.value.titulo,
        tiempo : postalForm.value.tiempo,
        precio : postalForm.value.precio,
        dias : postalForm.value.dias,
      }

      this._postalService.registro(data).subscribe(
        response =>{
          console.log(response);
          this.postal = new Postal('','','','',null);
          this.listar();
        },
        error=>{  
          console.log(error);
          
        }
      );
    }else{
      this.msm_error = 'Complete correctamente el formulario';
    }
  }

  listar(){
    this._postalService.listar().subscribe(
      response =>{
        this.postales = response.postales;
        console.log(this.postales);
        
      },
      error=>{

      }
    );
  }

  close_alert(){
    this.msm_error = '';
  }

  eliminar(id){
    this._postalService.eliminar(id).subscribe(
      response =>{
        this.listar();
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
      },
      error=>{

      }
    );
  }

}
