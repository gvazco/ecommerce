import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from "src/app/services/GLOBAL";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VentaService } from "src/app/services/venta.service";
import { ComentarioService } from "src/app/services/comentario.service";
import { ProductoService } from 'src/app/services/producto.service';

declare const Buffer;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-detalle-cancelacion',
  templateUrl: './detalle-cancelacion.component.html',
  styleUrls: ['./detalle-cancelacion.component.css']
})
export class DetalleCancelacionComponent implements OnInit {

  public id;
  public cancelacion : any = {};
  public detalle : any = {};
  public venta : any = {};
  public url;
  public access_token;
  public idventa;
  public identity;
  public result_soli_error = '';
  public result_soli = '';

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private _ventaService: VentaService,
    private _comentarioService : ComentarioService,
    private _productoService : ProductoService,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.url = GLOBAL.url;
        this._route.params.subscribe(
          params=>{
            this.id = params['id'];
            
          }
        );
    
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
    this._ventaService.get_cancelacion(this.id).subscribe(
      response =>{
        this.cancelacion = response.cancelacion;
        this._ventaService.detalle(this.cancelacion.venta._id).subscribe(
          response =>{
            this.detalle = response.detalle;
            this.venta = response.venta;
            this.idventa = this.venta.idtransaccion;
            console.log(this.detalle);
            
          },
          error=>{
          }
        );
      },
      error=>{

      }
    );
  }

  reembolsar(){
    
    this._ventaService.get_token().subscribe(
      response =>{
        this.access_token = response.access_token;
        console.log(this.access_token);
        
        this._ventaService.set_reembolso(this.access_token,this.idventa).subscribe(
          response =>{
           this._ventaService.reembolsar(this.venta._id,this.id).subscribe(
             response =>{
              this.detalle.forEach(element => {
                this._productoService.reducir_stock(element.producto._id,element.cantidad).subscribe(
                  response =>{
       
                  }
                );
              });
              this.result_soli_error = '';
              this.init_data();
              $('#reembolsar-modal').modal('hide');
              $('.modal-backdrop').removeClass('show');
              this.result_soli = 'Se efectuó un reembolso integro al usuario.';
             },
             error=>{
              this.result_soli_error = 'Ocurrió un error al efectuar el reembolso';
             }
           );
            
          },
          error=>{
            console.log(error);
            
          }
        );
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  denegar(){
    this._ventaService.denegar(this.venta._id,this.id).subscribe(
      response =>{
       this.result_soli_error = '';
       this.init_data();

       $('#denegar-modal').modal('hide');
       $('.modal-backdrop').removeClass('show');
       this.result_soli = 'Se denegó el reembolso, la venta procederá con el envio.';
       
      },
      error=>{
       this.result_soli_error = 'Ocurrió un error al denegar la cancelación.*529';
      }
    );
     
   
  }

  close_alert(){
    this.result_soli = '';
    this.result_soli_error = '';
  }
}
