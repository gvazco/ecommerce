import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { Producto } from "../models/Producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(
    private _http : HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  listar(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto/'+filtro,{headers:headers})
  }

  best_seller():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'productos_ventas/best_sellers',{headers:headers})
  }

  populares():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'productos_ventas/populares',{headers:headers})
  }

  listar_admin(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'productos/admin/'+filtro,{headers:headers})
  }

  listar_prices(filtro,min,max,subcategoria,cat,sort,marca):Observable<any>{
    console.log(marca);
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto/'+filtro+'/'+min+'/'+max+'/'+subcategoria+'/'+cat+'/'+sort+'/'+marca,{headers:headers})
  }

  cat_by_name(nombre):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'categoria/name/'+nombre,{headers:headers})
  }

  listar_papelera(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'productos/papelera/'+filtro,{headers:headers})
  }

  listar_cat(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto_admin_cat/cat/'+filtro,{headers:headers})
  }

  listar_autocomplete():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto_cliente_autocomplete',{headers:headers})
  }

  listar_general_data(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto_general/general/data/'+filtro,{headers:headers})
  }

  find_by_slug(slug):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto_by_slug/slug/'+slug,{headers:headers})
  }

  listar_cat_papelera(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'productos/cat/papelera/'+filtro,{headers:headers})
  }

  list_one(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto_admin_editar/one/'+id,{headers:headers})
  }

  listar_newest():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'productos_nuevos/show_producto',{headers:headers})
  }

  reducir_stock(id,cantidad):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'productos_stock/reducir/'+id+'/'+cantidad,{headers:headers})
  }

  aumentar_stock(id,cantidad):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'productos_stock/aumentar/'+id+'/'+cantidad,{headers:headers})
  }

  desactivar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto_admin/admin/desactivar/'+id,{headers:headers})
  }

  activar(id):Observable<any>{
   
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto_admin/admin/activar/'+id,{headers:headers})
  }

  papelera(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto_admin/admin/papelera/'+id,{headers:headers})
  }

  aumentar_ventas(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'productos_ventas/aumentar/'+id,{headers:headers})
  }

  update(data):Observable<any>{
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('poster',data.poster);
    fd.append('precio_ahora',data.precio_ahora);
    fd.append('precio_antes',data.precio_antes);
    fd.append('video_review',data.video_review);
    fd.append('info_short',data.info_short);
    fd.append('detalle',data.detalle);
    fd.append('stock',data.stock);
    fd.append('categoria',data.categoria);
    fd.append('subcategoria',data.subcategoria);
    fd.append('nombre_selector',data.nombre_selector);
    fd.append('marca',data.marca);
    
    return this._http.put(this.url + 'producto/'+data._id+'/'+data.img_name,fd);
  }

  registro(data):Observable<any>{
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('poster',data.poster);
    fd.append('precio_ahora',data.precio_ahora);
    fd.append('precio_antes',data.precio_antes);
    fd.append('video_review',data.video_review);
    fd.append('info_short',data.info_short);
    fd.append('detalle',data.detalle);
    fd.append('stock',data.stock);
    fd.append('categoria',data.categoria);
    fd.append('subcategoria',data.subcategoria);
    fd.append('nombre_selector',data.nombre_selector);
    fd.append('marca',data.marca);
    return this._http.post(this.url + 'producto/registro',fd);
  }
}
