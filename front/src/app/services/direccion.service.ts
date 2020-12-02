import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { Direccion } from "../models/Direccion";

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  public url;

  constructor(
    private _http : HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   registro(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'direccion/registro',data,{headers:headers})
  }

  listar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'direcciones/'+id,{headers:headers})
  }

  get_direccion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'direccion/data/'+id,{headers:headers})
  }

  update(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'direccion/update/'+data._id,data,{headers:headers})
  }

  eliminar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'direccion/remove/'+id,{headers:headers})
  }
}
