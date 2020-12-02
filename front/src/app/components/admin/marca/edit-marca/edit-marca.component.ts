import { Component, OnInit, DoCheck } from '@angular/core';
import { Marca } from "../../../../models/Marca";
import { MarcaService } from "../../../../services/marca.service";
import { GLOBAL } from "../../../../services/GLOBAL";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-edit-marca',
  templateUrl: './edit-marca.component.html',
  styleUrls: ['./edit-marca.component.css']
})
export class EditMarcaComponent implements OnInit,DoCheck {

  public id;
  public marca : any = {};
  public msm_error;
  public msm_success;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public url;
  public identity;

  constructor(
    private _marcaService : MarcaService,
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
            this._marcaService.list_one(this.id).subscribe(
              response=>{
                this.marca = response.marca;
                
                
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

  ngDoCheck(): void {

    /*  $('.cz-file-drop-preview').html("<img src="+this.imgSelect+">"); */
   }

  onSubmit(marcaForm){
    if(marcaForm.valid){

      let data = {
        nombre : marcaForm.value.nombre,
        descripcion : marcaForm.value.descripcion,
        banner : this.file,
        _id: this.marca._id,
        img_name : this.marca.banner
      }
      
      this._marcaService.update(data).subscribe(
        response =>{
          this._router.navigate(['/admin/marcas']);
          
        },
        error=>{
          this.msm_error = error;
          console.log(error);
          
        }
      );
      
    }else{
      this.msm_error = 'Complete correctamente el formulario por favor.';
    }
  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect= reader.result;
        reader.readAsDataURL(this.file);
      
        
    }
    
  }

  close_alert(){
    this.msm_error = '';
    this.msm_success = '';
  }

 
  
}
