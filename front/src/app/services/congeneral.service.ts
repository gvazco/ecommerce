import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class CongeneralService {

   public url;

  constructor(
    private _http : HttpClient,
  ) {
    this.url = GLOBAL.url;
   }

  get_data():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'congeneral/obtener',{headers:headers})
  }

  update(id,data):Observable<any>{
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('logo',data.logo);
    fd.append('favicon',data.favicon);
    fd.append('cr',data.cr);
    fd.append('telefono_uno',data.telefono_uno);
    fd.append('telefono_dos',data.telefono_dos);
    fd.append('email_uno',data.email_uno);
    fd.append('email_dos',data.email_dos);
    fd.append('direccion',data.direccion);
    fd.append('horarios',data.horarios);
    fd.append('iframe_mapa',data.iframe_mapa);
    fd.append('facebook',data.facebook);
    fd.append('instagram',data.instagram);
    fd.append('youtube',data.youtube);
    fd.append('twitter',data.twitter);
    return this._http.put(this.url + 'congeneral/update/'+id+'/'+data.str_logo+'/'+data.str_favicon,fd)
  }

  get_promocion():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'promocion/obtener',{headers:headers})
  }

  promocion_update(id,data):Observable<any>{
    const fd = new FormData();
    fd.append('etiqueta',data.etiqueta);
    fd.append('first_title',data.first_title);
    fd.append('producto_title',data.producto_title);
    fd.append('subtitulo',data.subtitulo);
    fd.append('end',data.end);
    fd.append('enlace',data.enlace);
    fd.append('banner',data.banner);
    fd.append('estado',data.estado);
    return this._http.put(this.url + 'promocion/update/'+id+'/'+data.str_banner,fd)
  }

  get_slider():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'slider/obtener',{headers:headers})
  }
  
  get_slider_one(id):Observable<any>{
    console.log(id);
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'slider/one/'+id,{headers:headers})
  }

  update_slider(id,data):Observable<any>{
    const fd = new FormData();
    fd.append('titulo_uno',data.titulo_uno);
    fd.append('titulo_dos',data.titulo_dos);
    fd.append('imagen',data.imagen);
    fd.append('estado',data.estado);
    fd.append('subtitulo',data.subtitulo);
    fd.append('str_banner',data.str_banner);
    return this._http.put(this.url + 'slider/update/'+id+'/'+data.str_banner,fd)
  }
}
