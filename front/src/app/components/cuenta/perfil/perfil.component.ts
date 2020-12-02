import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from "src/app/services/GLOBAL";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "src/app/models/User";
import { HttpClient } from '@angular/common/http';


declare var jQuery:any;
declare var $:any;

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public identity;
  public url;
  public user : any = {};
  public paises;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public data_paises : any = [];
  public msm_error = false;
  public msm_success = false;
  public pass_error = false;

  //DATA
  public new_password = '';
  public comfirm_password = '';
 
  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
    
  }

  ngOnInit(): void {

    if(this.identity){
      this.http.get('https://restcountries.eu/rest/v2/all').subscribe(
        data => {
          
          this.paises = data;
          this.paises.forEach(element => {
              this.data_paises.push(element.name); 
    
          });
        
        }
      );
      this.get_data_user();
    }else{
      this._router.navigate(['/']);
    }
    
    
    

  }

  close_alert(){
    this.msm_success = false;
    this.msm_error = false;
  }

  get_data_user(){
    this._userService.get_user(this.identity._id).subscribe(
      response =>{
        this.user = response.user;
        
        
      },
      error=>{

      }
    )
  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect= reader.result;
        reader.readAsDataURL(this.file);
      
        
    }
    
  }

  logout(){
    
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    
    this.identity = null;

    this._router.navigate(['/']);
  }

  view_password(){
    let type = $('#password').attr('type');

    if(type == 'text'){
      $('#password').attr('type','password');
      
    }else if(type == 'password'){
      $('#password').attr('type','text');
    }
  }

  view_password2(){
    let type = $('#password_dos').attr('type');

    if(type == 'text'){
      $('#password_dos').attr('type','password');
      
    }else if(type == 'password'){
      $('#password_dos').attr('type','text');
    }
  }

  onSubmit(userForm){
    if(userForm.valid){
      if(this.new_password && this.comfirm_password){
        if(this.new_password == this.comfirm_password){
          
          let data = {
            first_name : userForm.value.first_name,
            last_name : userForm.value.last_name,
            telefono : userForm.value.telefono,
            numdoc : userForm.value.numdoc,
            pais : userForm.value.pais,
            perfil : this.file,
            password: this.new_password,
            img_name: this.user.perfil,
            _id:this.identity._id
          }
  
          this._userService.update(data).subscribe(
            response =>{
              this.get_data_user();
              this.msm_success = true;
              this.pass_error = false;
              this.msm_error = false;
              this.new_password = '';
              this.comfirm_password = '';
            },
            error =>{
           
              
            }
          );
        }else{
          //CONTRASEÑA NO COINCIDEN
          this.pass_error = true;
        }
        
      }
      else{

        //SIN PASSWORD

        let data = {
          first_name : userForm.value.first_name,
          last_name : userForm.value.last_name,
          telefono : userForm.value.telefono,
          numdoc : userForm.value.numdoc,
          pais : userForm.value.pais,
          perfil : this.file,
          password: this.new_password,
          img_name: this.user.perfil,
          _id:this.identity._id
        }

        this._userService.update(data).subscribe(
          response =>{
            this.get_data_user();
            this.msm_success = true;
            this.pass_error = false;
            this.msm_error = false;
            this.new_password = '';
            this.comfirm_password = '';
          },
          error =>{
            
            
          }
        );
        
      }
    }else{
      this.msm_error = true;
    }
  }


}
