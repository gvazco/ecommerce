import { Component, OnInit, DoCheck } from '@angular/core';
import { CongeneralService } from 'src/app/services/congeneral.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit, DoCheck {

  public file_logo :File;
  public imgSelect_logo : String | ArrayBuffer;
  public file_favicon :File;
  public imgSelect_favicon : String | ArrayBuffer;
  public general: any = {};
  public url;
  public msm_error = false;
  public msm_success = false;
  public identity;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _congeneralService : CongeneralService
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.init_data();
        
      }
      else{
        this._router.navigate(['/']);
      }
    }else{
      this._router.navigate(['/']);
    }
    
  }

  init_data(){
    this._congeneralService.get_data().subscribe(
      response =>{
        this.general = response.data;
        $('#content-mapa').html(this.general.iframe_mapa);
      },
      error=>{
        
      }
    );
  }
  

  imgSelected_logo(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file_logo = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect_logo= reader.result;
        reader.readAsDataURL(this.file_logo);
        $('#logo-icon').addClass('cz-file-drop-preview img-thumbnail rounded logo-preview');
        $('#logo-icon').removeClass('cz-file-drop-icon czi-cloud-upload');
        
        
    }
 
  }

  imgSelected_favicon(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file_favicon = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect_favicon= reader.result;
        reader.readAsDataURL(this.file_favicon);
        $('#favicon-icon').addClass('cz-file-drop-preview img-thumbnail rounded favicon-preview');
        $('#favicon-icon').removeClass('cz-file-drop-icon czi-cloud-upload');
        
        
    }
 
  }

  ngDoCheck(): void {

    $('.logo-preview').html("<img src="+this.imgSelect_logo+">");
    $('.favicon-preview').html("<img src="+this.imgSelect_favicon+">");
  }

  onkey_iframe(data){
    
    $('#content-mapa').html(data);
  }

  onSubmit(generalForm){
    let data = {
      titulo: generalForm.value.titulo,
      logo:  this.file_logo,
      favicon:  this.file_favicon,
      cr:  generalForm.value.cr,
      telefono_uno:  generalForm.value.telefono_uno,
      telefono_dos:  generalForm.value.telefono_dos,
      email_uno:  generalForm.value.email_uno,
      email_dos:  generalForm.value.email_dos,
      direccion:  generalForm.value.direccion,
      horarios:  generalForm.value.horarios,
      iframe_mapa:  generalForm.value.iframe_mapa,
      str_logo: this.general.logo,
      str_favicon : this.general.favicon,
      facebook:generalForm.value.facebook,
      instagram:generalForm.value.instagram,
      youtube:generalForm.value.youtube,
      twitter:generalForm.value.twitter,
    }

    this._congeneralService.update(this.general._id,data).subscribe(
      response =>{
        console.log(response);
        this.msm_error = false;
        this.msm_success = true;
        window.scroll(0,0);
      },
      error=>{
        
        
        window.scroll(0,0);
        this.msm_error = true;
        this.msm_success = false;
      }
    );
  }
}
