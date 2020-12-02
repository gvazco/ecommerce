import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url;

  constructor(
    private _http : HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  registro(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'venta/registro',data,{headers:headers});
  }

  listar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'venta/data/'+id,{headers:headers});
  }

  detalle(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'venta_track/detalle/'+id,{headers:headers});
  }

  finalizar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'venta_finalizar/venta/'+id,{headers:headers});
  }
  
  update_envio(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'venta_enviado/update/'+id,{headers:headers});
  }

  evaluar_cancelacion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'cancelacion_evaluar/venta/'+id,{headers:headers});
  }

  reembolsar(id,idticket):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'cancelacion_send/reembolsar/'+id+'/'+idticket,{headers:headers});
  }


  cancelar(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'cancelacion_send/cancelar',data,{headers:headers});
  }

  denegar(id,idticket):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'cancelacion_send/denegar/'+id+'/'+idticket,{headers:headers});
  }

  listar_cancelacion(wr):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'get_cancelacion_admin/data/'+wr,{headers:headers});
  }

  get_cancelacion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'get_one_cancelacion_admin/one/'+id,{headers:headers});
  }

  get_token():Observable<any>{
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('AVTHn-IitbqsInQ7Y_Ald2kPSvEjTd3RRm_OevRxyzv_tXo7XskvFK6w2IxFuZLeKSXWUqoDg_JdWu5V:EEsCqW90NzqtlU_UWbryf3gtIoSQFtdcbgyUKJuEHFul24dniR3q6b-uYdwkNzfs0emfAX7bAuzTxtmU'),
    });
    return this._http.post('https://api.sandbox.paypal.com/v1/oauth2/token','grant_type=client_credentials',{headers:headers});
  }

  set_reembolso(token,id):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this._http.post('https://api.sandbox.paypal.com/v1/payments/capture/'+id+'/refund',{},{headers:headers});
  }

  track(number){
    let headers = new HttpHeaders()
    .set('x-rapidapi-host','apidojo-17track-v1.p.rapidapi.com')
    .set("x-rapidapi-key", "a7036a3222mshc2920e679cd1cafp141e56jsn81cbe707ac15")
    .set("useQueryString", "true");
    return this._http.get('https://apidojo-17track-v1.p.rapidapi.com/track?timeZoneOffset=0&codes='+number,{headers:headers});
  }

  get_cancelacion_venta(id):Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'cancelacion_venta/obtener_data/'+id,{headers:headers});
  }

  evaluar_venta_user(user,producto):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'evaluar_venta/data/'+user+'/'+producto,{headers:headers});
  }

  get_data_venta_admin(search,orden,tipo):Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'venta_admin/listar/'+search+'/'+orden+'/'+tipo,{headers:headers});
  }

  set_track(id,data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'venta_track/set/'+id,data,{headers:headers});
  }

  get_data_dashboard():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'venta_data/dashboard',{headers:headers});
  }

  get_detalle_hoy():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'venta_data/detalles/hoy',{headers:headers});
  }

  init_data_admin():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'venta_admin_init/init_data',{headers:headers});
  }
}
