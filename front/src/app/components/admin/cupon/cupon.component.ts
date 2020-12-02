import { Component, OnInit } from '@angular/core';
import { Cupon } from 'src/app/models/Cupon';
import { CategoriaService } from "src/app/services/categoria.service";
import { CuponService } from "src/app/services/cupon.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styleUrls: ['./cupon.component.css']
})
export class CuponComponent implements OnInit {

  public cupon = new Cupon('','','',null,'','','');
  public categorias;
  public subcategorias : any = [];
  public msm_error = '';
  public cupones;
  public identity;

  constructor(
    private _categoriaService : CategoriaService,
    private _cuponService : CuponService,
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
        this._categoriaService.listar("").subscribe(
          response=>{
            this.categorias = response.categorias;  
            response.categorias.forEach(element => {
              element.subcategorias.split(',').forEach(element => {
                
                  this.subcategorias.push({subcategoria:element.trim()});
                  
                  
              });
              
            });
          },
          error=>{
    
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

  generar_cupon(){
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    let result_uno='';
    let result_dos='';

    for ( var i = 0; i < 2; i++ ) {
      result_uno += characters.charAt(Math.floor(Math.random() * charactersLength));
      result_dos += characters.charAt(Math.floor(Math.random() * charactersLength));
    }



    let num = Math.round(Math.random() * (999999999 - 100000000) + 100000000);
    this.cupon.codigo = result_uno+num+result_dos;
  }

  listar(){
    this._cuponService.listar().subscribe(
      response =>{
        this.cupones = response.cupones;
      },
      error=>{

      }
    );
  }

  onSubmit(cuponForm){
    if(cuponForm.valid){
      var data;
      if(cuponForm.value.subcategoria){
        data = {
          categoria :cuponForm.value.categoria,
          subcategoria :cuponForm.value.subcategoria.toString(),
          descuento :cuponForm.value.descuento,
          tipo :cuponForm.value.tipo,
          codigo :cuponForm.value.codigo,
        }
      }else{
        data = {
          categoria :cuponForm.value.categoria,
          subcategoria :'',
          descuento :cuponForm.value.descuento,
          tipo :cuponForm.value.tipo,
          codigo :cuponForm.value.codigo,
        }
      }
      if(data.tipo == 'categoria'){
        if(data.categoria){
          if(data.descuento <= 100){
            this._cuponService.registro(data).subscribe(
              response =>{
                this.cupon = new Cupon('','','',null,'','','');
                this.listar();
              },
              error=>{
                console.log(error);
              }
            );
          }else{
            this.msm_error = 'El porcentaje debe ser inferior al 100';
          }
        }else{
          this.msm_error = 'Seleccione una categoria por favor.'
        }
      }else if(data.tipo == 'subcategoria'){
        if(data.subcategoria){
          if(data.descuento <= 100){
            this._cuponService.registro(data).subscribe(
              response =>{
                this.cupon = new Cupon('','','',null,'','','');
                this.listar();
              },
              error=>{
                console.log(error);
                
              }
            );
          }else{
            this.msm_error = 'El porcentaje debe ser inferior al 100';
          }
        }else{
          this.msm_error = 'Seleccione una subcategoria por favor.'
        }
      }
    }else{
      this.msm_error = 'Complete correctamente el formulario';
    }
    
  }

  select_tipo(event,cupon){
    if(cupon == 'categoria'){
      $('#fm-cat').css('display','block');
      $('#fm-sub').css('display','none');

    }else if(cupon == 'subcategoria'){
      $('#fm-cat').css('display','none');
      $('#fm-sub').css('display','block');

    }
    
  }

  eliminar(id){
    this._cuponService.eliminar(id).subscribe(
      response =>{
        this.listar();
        $('#modal-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
      },
      error=>{

      }
    );
  }

  close_alert(){
    this.msm_error = '';
  }
}
