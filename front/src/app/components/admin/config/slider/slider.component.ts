import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ContactoService } from 'src/app/services/contacto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CongeneralService } from 'src/app/services/congeneral.service';
interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public url;
  public identity;
  public sliders : any = {};
  public slider ;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public click_edit = 0;
  public imagen_after;
  public msm_error = false;
  public msm_success = false;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _congeneralService:CongeneralService
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.data_init();
       
      }
      else{
        this._router.navigate(['/']);
      }
    }else{
      this._router.navigate(['/']);
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

  get_select_data(item){
    
    this.file = null;
    this.imgSelect = null;
    $('.form-edit').addClass('ocultar');
    this.click_edit = this.click_edit +1;
    this.imagen_after = item.imagen;
    $('#form-'+item._id).removeClass('ocultar');
    this.slider = {
      _id: item._id,
      titulo_uno : item.titulo_uno,
      imagen: item.imagen,
      titulo_dos: item.titulo_dos,
      subtitulo: item.subtitulo,
      estado: item.estado,
    }    
    
  }

  data_init(){
    this.slider = {};
    this._congeneralService.get_slider().subscribe(
      response =>{
        this.sliders = response.data;
        console.log(this.sliders);
        
      },
      error=>{

      }
    );
  }

  onSubmit(slider){
    let data = {
      titulo_uno : slider.titulo_uno,
      imagen: this.file,
      titulo_dos: slider.titulo_dos,
      subtitulo: slider.subtitulo,
      estado: slider.estado,
      str_banner: this.imagen_after
    }
console.log(data);

    this._congeneralService.update_slider(slider._id,data).subscribe(
      response =>{
        this.file = null;
        this.imgSelect = null;
        $('.form-edit').addClass('ocultar');
        this.msm_error = false;
          this.msm_success = true;
          window.scroll(0,0);
          this.data_init();
      },
      error=>{
        console.log(error);
        window.scroll(0,0);
          this.msm_error = true;
          this.msm_success = false;
      }
    );
    
  }

}
