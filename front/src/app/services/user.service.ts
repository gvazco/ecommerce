import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { User } from "../models/User";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  public user;
  public token;
  public identity;
  public headers = false;

  constructor(
    private _http : HttpClient,
    private _router : Router
  ) { 
    this.url = GLOBAL.url;
    this.user;
  }

  login(email,password,getToken = null):Observable<any>{
    let json = {
      email : email,
      password : password,
      getToken : getToken
    };

    if(getToken != null){
      json.getToken = true;
    }

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'login',json,{headers:headers})
  }

  registro(user,getToken = null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'registro',user,{headers:headers})
  }

  set_recovery_token(email):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'user_token/set/'+email,{headers:headers})
  }

  verify_token(email,codigo):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'user_verify/token/'+email+'/'+codigo,{headers:headers})
  }

  change_password(email,data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'user_password/change/'+email,data,{headers:headers})
  }

  getToken():Observable<any>{
    let token = localStorage.getItem('token');
    if(token){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getIdentity():Observable<any>{
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  get_user(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'user_get/data/'+id,{headers:headers})
  }

  get_user_data():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'user_get/admin',{headers:headers})
  }




  update(data):Observable<any>{
    const fd = new FormData();
    fd.append('first_name',data.first_name);
    fd.append('last_name',data.last_name);
    fd.append('telefono',data.telefono);
    fd.append('pais',data.pais);
    fd.append('numdoc',data.numdoc);
    fd.append('perfil',data.perfil);
    fd.append('password',data.password);
    
    return this._http.put(this.url + 'user/actualizar/'+data._id+'/'+data.img_name,fd);
  }

}
