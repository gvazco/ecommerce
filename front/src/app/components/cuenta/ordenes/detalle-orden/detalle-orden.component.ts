import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from "src/app/services/GLOBAL";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VentaService } from "src/app/services/venta.service";
import { ComentarioService } from "src/app/services/comentario.service";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  public identity;
  public url;
  public msm_error = false;
  public msm_success = false;
  public id;
  public detalle : any = {};
  public venta : any = {};

  public id_review_producto;
  public review_comentario='';
  public review_pros='';
  public review_cons='';
  public review_estrellas='';
  public select_detalle='';

  public msm_error_review='';
  public data_comentarios : Array<any> = [];
  public btn_cancelar;

  public cancelacion : any = {};
  public msm_error_cancelar = '';
  public data_cancelacion : any = {};

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private _ventaService: VentaService,
    private _comentarioService : ComentarioService
  ) { 
    this.identity = this._userService.getIdentity();
  }

  modal_data(idproducto,id){
    this.id_review_producto = idproducto;
    this.select_detalle = id;
    this.msm_error_review = '';
    this.review_comentario='';
    this.review_pros='';
    this.review_cons='';
    this.review_estrellas='';
  }

  

  ngOnInit(): void {
    
    if(this.identity){
      this.url = GLOBAL.url;
      this._route.params.subscribe(
        params=>{
          this.id = params['id'];
          this.init_data();
          this.get_cancelacion();
        
        }
      );
  
      this.cancelacion = {
        mensaje: '',
        user : this.identity._id,
        venta : this.id
      };
      
    }else{
      this._router.navigate(['/']);
    }

  }

  init_data(){
    this._ventaService.detalle(this.id).subscribe(
      response =>{
        this.detalle = response.detalle;
        this.venta = response.venta;
        this.data_reviews();
        this.evaluar_cancelacion();
      },
      error=>{
      }
    );
  }

  get_cancelacion(){
    
    this._ventaService.get_cancelacion_venta(this.id).subscribe(
      response =>{
        this.data_cancelacion = response.cancelacion;
       
        
      },
      error =>{
        this.data_cancelacion = null;
        
      }
    );
  }

  evaluar_cancelacion(){
    this._ventaService.evaluar_cancelacion(this.id).subscribe(
      response =>{
        this.btn_cancelar = response.data;
      },
      error =>{
        
      }
    );
  }

  finalizar(id){
    this._ventaService.finalizar(id).subscribe(
      response =>{
        this._ventaService.detalle(this.id).subscribe(
          response =>{
            this.detalle = response.detalle;
            this.venta = response.venta;
            $('#finalizar').modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.data_reviews();
            
          },
          error=>{

          }
        );
      },
      error=>{

      }
    );
  }

  cancelar(cancelarForm){
    if(cancelarForm.valid){
      this.msm_error_cancelar = '';
      this.cancelacion.mensaje = cancelarForm.value.mensaje;
      
      this._ventaService.cancelar(this.cancelacion).subscribe(
        response =>{
          $('#sol_cancelar').modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.evaluar_cancelacion();
          this.init_data();
          this.get_cancelacion();
        },
        error=>{
          console.log(error);
          
        }
      );
    }else{
      this.msm_error_cancelar = 'Escribe el motivo de la cancelación.'
    }
  }

  data_reviews(){
    this._comentarioService.listar().subscribe(
      response =>{
        response.comentarios.forEach(element => {
          this.data_comentarios.push({
            producto: element.producto,
            user : element.user
          });
        });

        
      },
      error=>{
        
        
      }
    );
  }

  logout(){
    
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    
    this.identity = null;

    this._router.navigate(['/']);
  }

  saveComent(reviewForm){
    if(reviewForm.valid){
      
      let data = {
        comentario: reviewForm.value.review_comentario,
        pros: reviewForm.value.review_pros,
        cons: reviewForm.value.review_cons,
        estrellas: reviewForm.value.review_estrellas,
        user: this.identity._id,
        producto: this.id_review_producto,
      }
      this._comentarioService.registro(data).subscribe(
        response =>{
          this.msm_error_review = '';
          this.id_review_producto='';
          this.review_comentario='';
          this.review_pros='';
          this.review_cons='';
          this.review_estrellas='';
          $('#save-'+this.select_detalle).modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.select_detalle = '';
        },
        error=>{
          this.msm_error_review = error.error.message;
          
        }
      );
      
    }else{
      this.msm_error_review = 'Complete correctamente los campos.';
    }
  }

  close_alert(){
    this.msm_error_review = '';
    this.msm_error_cancelar = '';
  }

  
}
