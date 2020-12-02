import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { Selector } from "../models/Selector";

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  public url;
  constructor(
    private _http : HttpClient,
    
  ) {
    this.url = GLOBAL.url;
  }

  listar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'selectores/'+id,{headers:headers})
  }

  listar_todo():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'selectores/todo',{headers:headers})
  }



  registro(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'selector/registro',data,{headers:headers})
  }

  eliminar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'selector/'+id,{headers:headers})
  }

  estado(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'selector/'+id,{headers:headers})
  }
}
