import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  public url;

  constructor(
    private _http : HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  registro(data):Observable<any>{
    const fd = new FormData();
    fd.append('user',data.user);
    fd.append('factura',data.factura);
    fd.append('total_pagado',data.total_pagado);
    fd.append('proveedor',data.proveedor);
    fd.append('nota',data.nota);
    fd.append('detalles',data.detalles);
    return this._http.post(this.url + 'ingreso/registro',fd);
  }

  get_data_venta_admin(search,orden,tipo):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'ingreso/listar/'+search+'/'+orden+'/'+tipo,{headers:headers});
  }

  get_data_detalle(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'ingreso/detalle/'+id,{headers:headers});
  }

  init_data():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'ingreso/init_data',{headers:headers});
  }
}
