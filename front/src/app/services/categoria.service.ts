import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { Categoria } from "../models/Categoria";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public url;

  constructor(
    private _http : HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  listar(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'categoria/'+filtro,{headers:headers})
  }

  get_car_slide():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'categoria/get/slider',{headers:headers})
  }

  list_one(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'categoria/one/'+id,{headers:headers})
  }

  eliminar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'categoria/'+id,{headers:headers})
  }

  update(data):Observable<any>{
    const fd = new FormData();
    fd.append('nombre',data.nombre);
    fd.append('icono',data.icono);
    fd.append('subcategorias',data.subcategorias);
    fd.append('banner',data.banner);
    fd.append('state_banner',data.state_banner);
    return this._http.put(this.url + 'categoria/'+data._id+'/'+data.img_name,fd);
  }

  registro(data):Observable<any>{
    const fd = new FormData();
    fd.append('nombre',data.nombre);
    fd.append('icono',data.icono);
    fd.append('subcategorias',data.subcategorias);
    fd.append('banner',data.banner);
    fd.append('state_banner',data.state_banner);
    return this._http.post(this.url + 'categoria/registro',fd);
  }
}
