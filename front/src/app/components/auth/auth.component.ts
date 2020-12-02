import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { UserService } from "../../services/user.service";
import { decimalDigest } from '@angular/compiler/src/i18n/digest';
import { Router } from '@angular/router';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { HttpClient } from '@angular/common/http';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public user = new User('','','','','','','','','');
  public usertwo = new User('','','','','','','','','');
  public data_error;
  public errors;
  public error_reg;
  public success_reg;
  public token;
  public identity;
  public authenticate;
  public authorization = false;
 
  public password_confirm = '';

  public datauser: SocialUser;
  public loggedIn: boolean;

  constructor(
    private _userService : UserService,
    private _router : Router,
    private authService: SocialAuthService,
    private http: HttpClient
  ) { 
    this.identity = this._userService.getIdentity();
    this.authenticate = localStorage.getItem('authenticate');
  }

  ngOnInit(): void {
    
    if(this.identity){
      this._router.navigate(['/']);
    }else{
      this.authService.authState.subscribe((user) => {
        this.datauser = user;
        this.loggedIn = (user != null);

        let data = {
          first_name : this.datauser.name,
          last_name :this.datauser.lastName,
          email:this.datauser.email,
          password:this.datauser.id,
          telefono: null
        }
  
        this._userService.registro(data).subscribe(
          response =>{
            this.error_reg = '';
            this._userService.login(data.email,data.password).subscribe(
              response =>{
                
                this.token = response.jwt;
                localStorage.setItem('token',this.token);
  
                this._userService.login(data.email,data.password,true).subscribe(
                  response=>{
              
                    
                    localStorage.setItem('identity',JSON.stringify(response.user));
                    this._router.navigate(['/']);
                  },
                  error=>{
  
                  }
                )
              },
              error=>{
  
                this.data_error = error.error.message;
              }
            );
            
          },
          error=>{
           
            
            this._userService.login(data.email,data.password).subscribe(
              response =>{
                
                this.token = response.jwt;
                localStorage.setItem('token',this.token);
  
                this._userService.login(data.email,data.password,true).subscribe(
                  response=>{
                    
                    
                    localStorage.setItem('identity',JSON.stringify(response.user));
                    this._router.navigate(['/']);
                  },
                  error=>{
  
                  }
                )
              },
              error=>{
  
                this.data_error = error.error.message;
              }
            );
            
          }
        );
        
  
      });
    }
  }

  view_password(){
    let type = $('#password').attr('type');

    if(type == 'text'){
      $('#password').attr('type','password');
      
    }else if(type == 'password'){
      $('#password').attr('type','text');
    }
  }

  close_alert(){
    this.data_error = '';
    this.error_reg = '';
    this.success_reg = '';
  }

  login(loginForm){
    
    let email = loginForm.value.email;
    let password = loginForm.value.password;

    if(email == '' && password == ''){
      this.data_error = 'Ingrese correctamente las credenciales.'
    }else{
      this._userService.login(email,password).subscribe(
        response =>{
          
          this.token = response.jwt;
          localStorage.setItem('token',this.token);

          this._userService.login(email,password,true).subscribe(
            response=>{
              
              
              localStorage.setItem('identity',JSON.stringify(response.user));
              this._router.navigate(['/']);
            },
            error=>{

            }
          )
        },
        error=>{

          this.data_error = error.error.message;
        }
      );
    }
  }




  registro(registroForm){
    let first_name = registroForm.value.first_name;
    let last_name = registroForm.value.last_name;
    let email = registroForm.value.email;
    let password = registroForm.value.password;
    let telefono = registroForm.value.telefono;
    

    if(first_name == undefined || last_name == undefined || email == undefined|| telefono == undefined){
      this.error_reg = 'Complete todos los campos por favor.'
    }
    else if(password != this.password_confirm){
      this.error_reg = 'Las contraseñas no coinciden, por favor intente nuevamente.'
    }else{
      this._userService.registro({
        first_name : first_name,
        last_name : last_name,
        email : email,
        password : password,
        telefono : telefono
      }).subscribe(
        response =>{
          this.error_reg = '';
          this.success_reg = 'Ustéd se registró correctamente en el sistema.';
          this.usertwo = new User('','','','','','','','','');
          this.password_confirm = '';
        },
        error=>{

          if(error.error.message){
            this.error_reg = error.error.message;
          }else{
            this.error_reg = 'Completa correctamente los campos por favor.';
          }
          
          
        }
      );
    }  
    
    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }

}
