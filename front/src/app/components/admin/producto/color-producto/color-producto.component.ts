import { Component, OnInit } from '@angular/core';
import { ColorService } from "../../../../services/color.service";
import { ActivatedRoute, Router, ChildActivationStart } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from 'src/app/services/user.service';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-color-producto',
  templateUrl: './color-producto.component.html',
  styleUrls: ['./color-producto.component.css']
})
export class ColorProductoComponent implements OnInit {

  public id;
  public colores;
  public count_color;
  public page;
  public pageSize = 12;
  public titulo;
  public color;
  public msm_error;
  public identity;

  constructor(
    private _userService: UserService,
    private _colorService : ColorService,
    private _route : ActivatedRoute,
    private _router : Router
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {

    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.listar();
        $('#color-picker').spectrum({
          type: "text",
          togglePaletteOnly: "true",
          change: function(color) {
            $('#color-data').val(color.toHexString());
              
          }
        });
      }
      else{
        this._router.navigate(['/']);
      }
    }else{
      this._router.navigate(['/']);
    }
    
    
   
  }

  listar(){
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._colorService.listar(this.id).subscribe(
          response=>{
            this.colores = response.colores; 
            this.count_color = this.colores.length;
            this.page = 1;
            console.log(this.colores);
            
            
          },
          error=>{

          }
        )
      }
    );
  }


  onSubmit(colorForm){

    
    if(colorForm.valid){
      this._colorService.registro({titulo: this.titulo,producto:this.id,color:$('#color-data').val()}).subscribe(
        response =>{
          this.color;
          this.titulo = '';
          this.listar();
          this.msm_error = '';
        },
        error=>{
          this.msm_error = 'Complete correctamente el formulario por favor.'
        }
      )
      
    }else{
      this.msm_error = 'Complete correctamente el formulario por favor.'
    }
  }


  eliminar(id){
    this._colorService.eliminar(id).subscribe(
      response=>{
        this.listar();
      },
      error =>{

      }
    );
  }

}
