import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  public url;

  constructor(
    private _http : HttpClient
  ) 
  {
    this.url = GLOBAL.url;
  }

  registro(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'comentario/registro',data,{headers:headers})
  }

  listar():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'comentarios/data',{headers:headers})
  }

  listar_last():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'comentarios/last',{headers:headers})
  }

  get_data(id,orden):Observable<any>{
    
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'comentarios_client/obtener/'+id+'/'+orden,{headers:headers})
  }

  add_likes(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'comentarios_likes/add',data,{headers:headers})
  }

  get_likes(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'comentarios_likes/get/'+id,{headers:headers})
  }

  add_dislikes(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'comentarios_dislikes/add',data,{headers:headers})
  }

  get_dislikes(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'comentarios_dislikes/get/'+id,{headers:headers})
  }
}
