import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { Color } from "../models/Color";

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  public url;

  constructor(
    private _http : HttpClient
  ) 
  {
    this.url = GLOBAL.url;
  }

  listar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'colores/'+id,{headers:headers})
  }

  registro(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'color/registro',data,{headers:headers})
  }

  eliminar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'color/'+id,{headers:headers})
  }

  estado(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'color/'+id,{headers:headers})
  }
     
}
