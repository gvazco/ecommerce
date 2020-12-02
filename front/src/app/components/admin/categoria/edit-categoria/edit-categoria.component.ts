import { Component, OnInit, DoCheck } from '@angular/core';
import { CategoriaService } from "../../../../services/categoria.service";
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from "../../../../services/GLOBAL";
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.css']
})
export class EditCategoriaComponent implements OnInit,DoCheck {

  public id;
  public categoria : any = {};
  public msm_error;
  public msm_success;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public url;
  public identity;


  constructor(
    private _categoriaService : CategoriaService,
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
            this._categoriaService.list_one(this.id).subscribe(
              response=>{
                this.categoria = response.categoria;
                
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

  


  onSubmit(categoriaForm){
    if(categoriaForm.valid){

      let data = {
        nombre : categoriaForm.value.nombre,
        subcategorias : categoriaForm.value.subcategorias.replace(/ /g, ""),
        banner : this.file,
        _id: this.categoria._id,
        img_name : this.categoria.banner,
        icono: categoriaForm.value.icono,
        state_banner:categoriaForm.value.state_banner
      }

  
      
      
      this._categoriaService.update(data).subscribe(
        response =>{
          this._router.navigate(['/admin/categorias']);
          
        },
        error=>{
          this.msm_error = error;
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
