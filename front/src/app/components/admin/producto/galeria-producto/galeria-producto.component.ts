import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GaleriaService } from 'src/app/services/galeria.service';
import { GLOBAL } from "../../../../services/GLOBAL";
import { UserService } from 'src/app/services/user.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {

  public id;
  public imagenes : any = [];
  public files: File[] = [];
  public msm_error=false;
  public url;
  public page;
  public pageSize = 12;
  public count_img;
  public identity;

  constructor(
    private _galeriaService : GaleriaService,
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
            this._galeriaService.listar(this.id).subscribe(
              response=>{
                this.imagenes = response.imagenes; 
                this.count_img = this.imagenes.length;
                this.page = 1;
                
                
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

  close_toast(){
    /* $('#dark-toast').removeClass('show');
        $('#dark-toast').addClass('hide'); */
  } 

  close_modal(){
    $('#addimg').modal('hide');
    this.files = [];
  }
 
  close_alert(){
    this.msm_error = false;
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    console.log(this.files);
    
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(galeriaFormzz){
   
      let data = {
        imagenes : this.files,
        producto : this.id
      }

      this._galeriaService.registro(data).subscribe(
        response =>{
          this.close_modal();
          this.listar();
          
          
        },
        error=>{
          this.msm_error = true;
        }
      );
  }


  listar(){
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._galeriaService.listar(this.id).subscribe(
          response=>{
            this.imagenes = response.imagenes; 
            this.count_img = this.imagenes.length;
            this.page = 1;
            
            
          },
          error=>{

          }
        )
      }
    );
  }


  eliminar(id){
    this._galeriaService.eliminar(id).subscribe(
      response=>{

        $('#modal-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.listar();
        
      },
      error=>{
        
      }
    );
  }

}
