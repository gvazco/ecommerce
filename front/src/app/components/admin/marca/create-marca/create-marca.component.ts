import { Component, OnInit, DoCheck } from '@angular/core';
import { Marca } from "../../../../models/Marca";
import { MarcaService } from "../../../../services/marca.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-marca',
  templateUrl: './create-marca.component.html',
  styleUrls: ['./create-marca.component.css']
})
export class CreateMarcaComponent implements OnInit,DoCheck {

  public file :File;
  public imgSelect : String | ArrayBuffer;
  public marca = new Marca('','','','');
  public msm_error;
  public msm_success;
  public identity;


  constructor(
    private _marcaService : MarcaService,
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
  ) {
    this.identity = this._userService.getIdentity();
   }
  
  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
       
      }
      else{
        this._router.navigate(['/']);
      }
    }else{
      this._router.navigate(['/']);
    }
  }

  
  ngDoCheck(): void {
    $('.cz-file-drop-preview').html("<img src="+this.imgSelect+">");
  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect= reader.result;
        reader.readAsDataURL(this.file);
        $('.cz-file-drop-icon').addClass('cz-file-drop-preview img-thumbnail rounded');
        $('.cz-file-drop-icon').removeClass('cz-file-drop-icon czi-cloud-upload');
    }
    
  }

  close_alert(){
    this.msm_error = '';
    this.msm_success = '';
  }

  onSubmit(marcaForm){  
    
    if(marcaForm.valid){

      let data = {
        nombre : marcaForm.value.nombre,
        descripcion : marcaForm.value.descripcion,
        banner : this.file
      }
      
      this._marcaService.registro(data).subscribe(
        response =>{
          console.log(response);
          this.marca = new Marca('','','','');
          this.imgSelect = '';
          this.msm_success = 'La marca se registró con exito.'
        },
        error=>{
          this.msm_error = 'Complete correctamente el formulario por favor.';
        }
      );
      
    }else{
      this.msm_error = 'Complete correctamente el formulario por favor.';
    }
  }

}
