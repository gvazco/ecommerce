import { Component, OnInit, DoCheck } from '@angular/core';
import { Categoria } from "../../../../models/Categoria";
import { CategoriaService } from "../../../../services/categoria.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.css']
})
export class CreateCategoriaComponent implements OnInit,DoCheck {

  public file :File;
  public imgSelect : String | ArrayBuffer;
  public categoria = new Categoria('','','','','',false);
  public msm_error;
  public msm_success;
  public identity;

  constructor(
    private _categoriaService : CategoriaService,
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute
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

  onSubmit(categoriaForm){  
    
    if(categoriaForm.valid){

      let data = {
        nombre : categoriaForm.value.nombre,
        subcategorias : categoriaForm.value.subcategorias,
        banner : this.file,
        icono:categoriaForm.value.icono,
        state_banner:categoriaForm.value.state_banner
      }

      console.log(data);
      
      
      this._categoriaService.registro(data).subscribe(
        response =>{
          console.log(response);
          this.categoria = new Categoria('','','','','',false);
          this.imgSelect = '';
          this.msm_success = 'La categoria se registró con exito.'
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
