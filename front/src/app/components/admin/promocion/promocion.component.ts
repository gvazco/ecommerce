import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { CongeneralService } from 'src/app/services/congeneral.service';
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {

  public file :File;
  public imgSelect : String | ArrayBuffer;
  public url;
  public identity;
  public msm_error = false;
  public msm_success = false;
  public promocion : any = {};

  constructor(
    private _congeneralService : CongeneralService,
    private _userService: UserService,
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._congeneralService.get_promocion().subscribe(
      response =>{
        this.promocion = response.data;
      },error=>{

      }
    );
  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect= reader.result;
        reader.readAsDataURL(this.file);
        
    }
    
  }

  onSubmit(promocionForm){
    if(promocionForm.valid){
      let data = {
        etiqueta: promocionForm.value.etiqueta,
        first_title: promocionForm.value.first_title,
        producto_title: promocionForm.value.producto_title,
        subtitulo: promocionForm.value.subtitulo,
        end: promocionForm.value.end,
        enlace: promocionForm.value.enlace,
        banner: this.file,
        estado: promocionForm.value.estado,
        str_banner : this.promocion.banner,
      }

      this._congeneralService.promocion_update(this.promocion._id,data).subscribe(
        response =>{
          this.msm_error = false;
          this.msm_success = true;
          window.scroll(0,0);
        },
        error=>{
          console.log(error);
          window.scroll(0,0);
          this.msm_error = true;
          this.msm_success = false;
        }
      );
    }else{
     
      window.scroll(0,0);
      this.msm_error = true;
      this.msm_success = false;
    }
  }

}
