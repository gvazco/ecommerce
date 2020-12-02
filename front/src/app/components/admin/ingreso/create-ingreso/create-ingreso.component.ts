import { Component, OnInit, DoCheck } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IngresoService } from 'src/app/services/ingreso.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Observable } from 'rxjs/internal/Observable';


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-ingreso',
  templateUrl: './create-ingreso.component.html',
  styleUrls: ['./create-ingreso.component.css']
})
export class CreateIngresoComponent implements OnInit, DoCheck {

  public file :File;
  public imgSelect : String | ArrayBuffer;
  public url;
  public identity;
  public error_msm = false;
  public error_msm_form = '';
  public ingreso = {
    user : '',
    total_pagado: '',
    proveedor: '',
    nota: '',
    factura: '',
  }
  public productos;

  public detalle = {
    producto: '',
    precio_compra: 0,
    cantidad: 0,
    detalle:''
  }
  public filtro = '';
  public producto_seleccionado = {
    id : '',
    cantidad: '0',
    precio_ahora: '0',
    detalle:'',
    titulo_producto: ''
  };
  public data_ingreso : Array<any> = [];
  
  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _ingresoervice :IngresoService,
    private _productoService :ProductoService
  ) {
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this._productoService.listar_general_data('').subscribe(
          response =>{
            console.log(response);
            
            this.productos = response.data;
          },
          error=>{
            console.log(error);
            
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

  filtro_productos(){
    this._productoService.listar_general_data(this.filtro).subscribe(
      response =>{
        this.productos = response.data;
      },
      error=>{

      }
    );
  }

  select_producto(item){
    this.producto_seleccionado.id = item._id;
    this.producto_seleccionado.cantidad = item.stock;
    this.producto_seleccionado.precio_ahora = item.precio_ahora;
    this.producto_seleccionado.titulo_producto = item.titulo;
  }

  save_ingreso(){
    if(this.detalle.precio_compra && this.detalle.cantidad != 0 && this.detalle.cantidad && this.detalle.precio_compra != 0 && this.detalle.precio_compra){
      this.error_msm = false;
      this.data_ingreso.push({
        producto: this.producto_seleccionado.id,
        titulo_producto : this.producto_seleccionado.titulo_producto,
        cantidad: this.detalle.cantidad,
        precio_compra: this.detalle.precio_compra,
        detalle: this.detalle.detalle,
      });
      this.detalle = {
        producto: '',
        precio_compra: 0,
        cantidad: 0,
        detalle : '',
      }
    }else{
      this.error_msm = true;
    }
  }

  remove_row(idx){
    this.data_ingreso.splice(idx,1);
  }

  onSubmit(ingresoForm){
    if(ingresoForm.valid){
      if(this.data_ingreso.length <= 0){
        this.error_msm_form = 'Ingrese algun detalle en el cardex de ingreso.';
      }else{
        if(this.file){
          let data={
            user : this.identity._id,
            total_pagado: this.ingreso.total_pagado,
            proveedor: this.ingreso.proveedor,
            nota: this.ingreso.nota,
            factura: this.file,
            detalles: JSON.stringify(this.data_ingreso)
          }

          this._ingresoervice.registro(data).subscribe(
            response =>{
              console.log('success');
              
              this._router.navigate(['/admin/ingresos']);
              
            },
            error=>{
              console.log(error);
              
            }
          );
        }else{
          this.error_msm_form = 'Ingrese el resivo de la factura, para continuar.';
        }
        
      }
    }else{
      this.error_msm_form = 'Complete correctamente el formulario para poder continuar.';
    }
  }

  close_alert(){
    this.error_msm_form = '';
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
}
