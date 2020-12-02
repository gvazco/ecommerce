import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { Galeria } from "../models/Galeria";

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  public url;

  constructor(
    private _http : HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  listar(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'galeria/'+filtro,{headers:headers})
  }

  find_by_product(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'galeria_producto/find/'+id,{headers:headers})
  }

  registro(data):Observable<any>{

    const fd = new FormData();
    fd.append('producto',data.producto);
    data.imagenes.forEach(element => {
      fd.append('imagenes',element);
    });

    return this._http.post(this.url+'galeria/registro',fd);
  }

  eliminar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'galeria/'+id,{headers:headers})
  }
}
