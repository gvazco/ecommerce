import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { Marca } from "../models/Marca";

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  public url;

  constructor(
    private _http : HttpClient,
  ) {
    this.url = GLOBAL.url;
   }

  listar(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'marca/'+filtro,{headers:headers})
  }

  list_one(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'marca/one/'+id,{headers:headers})
  }

  eliminar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'marca/'+id,{headers:headers})
  }

  update(data):Observable<any>{
    const fd = new FormData();
    fd.append('nombre',data.nombre);
    fd.append('descripcion',data.descripcion);
    fd.append('banner',data.banner);
    
    return this._http.put(this.url + 'marca/'+data._id+'/'+data.img_name,fd);
  }

  registro(data):Observable<any>{
    const fd = new FormData();
    fd.append('nombre',data.nombre);
    fd.append('descripcion',data.descripcion);
    fd.append('banner',data.banner);
    
    return this._http.post(this.url + 'marca/registro',fd);
  }
}
