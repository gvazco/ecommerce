import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import { CongeneralService } from 'src/app/services/congeneral.service';
import { GLOBAL } from 'src/app/services/GLOBAL';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit,DoCheck {

  public identity;
  public general;
  public url;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _congeneralService : CongeneralService
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._congeneralService.get_data().subscribe(
      response =>{
        this.general = response.data;
      },
      error=>{
        
      }
    );
  }

  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
  }

  logout(){
    
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    
    this.identity = null;

    this._router.navigate(['/']);
  }

  show_menu(){
    
    let clase = $('.navbar-stuck-menu').attr('class');
    if(clase == 'navbar navbar-expand-lg navbar-dark navbar-stuck-menu mt-n2 pt-0 pb-2'){
      $('.navbar-stuck-menu').addClass('show');
    }else{
      $('.navbar-stuck-menu').removeClass('show');
    }
    
  }

  

}
