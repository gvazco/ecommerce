import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { Cupon } from "../models/Cupon";


@Injectable({
  providedIn: 'root'
})
export class CuponService {

  public url;

  constructor(
    private _http : HttpClient
  ) {
    this.url = GLOBAL.url;
   }

  registro(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'cupon/registro',data,{headers:headers})
  }

  listar():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'cupones',{headers:headers})
  }

  get_cupon(id):Observable<any>{
    console.log(id);
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'cupon/data/'+id,{headers:headers})
  }

  eliminar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'cupones/remove/'+id,{headers:headers})
  }
}
