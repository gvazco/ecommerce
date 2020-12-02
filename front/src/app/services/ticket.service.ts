import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public url;

  constructor(
    private _http : HttpClient
  ) 
  {
    this.url = GLOBAL.url;
  }

  registro(data):Observable<any>{
    console.log(data);
    
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'ticket_registro/registro',data,{headers:headers})
  }

  send(data):Observable<any>{
    console.log(data);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'ticket_msm/send',data,{headers:headers})
  }

  listar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'ticket_listar/listar/'+id,{headers:headers})
  }

  data(de,para):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'ticket_chat/chat/'+de+'/'+para,{headers:headers})
  }

  get_ticket(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'ticket_data/one/'+id,{headers:headers})
  }

  get_tickets_admin(status,estado){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'ticket_admin/all/'+status+'/'+estado,{headers:headers});
  }
}
