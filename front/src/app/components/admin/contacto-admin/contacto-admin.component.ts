import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-contacto-admin',
  templateUrl: './contacto-admin.component.html',
  styleUrls: ['./contacto-admin.component.css']
})
export class ContactoAdminComponent implements OnInit {

  public url;
  public identity;
  public mensajes : Array<any> = [];
  public page;
  public pageSize = 15;
  public count_cat;
  
  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _contactoService :ContactoService
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this._contactoService.listar().subscribe(
          response=>{
            this.mensajes = response.data;
            this.count_cat = this.mensajes.length;
            this.page = 1;
          },
          error=>{

          }
        );
      }
      else{
        this._router.navigate(['/']);
      }
    }else{
      this._router.navigate(['/']);
    }
  }

}
