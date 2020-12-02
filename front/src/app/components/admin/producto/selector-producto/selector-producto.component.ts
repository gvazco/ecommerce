import { Component, OnInit } from '@angular/core';
import { SelectorService } from "../../../../services/selector.service";
import { ActivatedRoute, Router, ChildActivationStart } from '@angular/router';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-selector-producto',
  templateUrl: './selector-producto.component.html',
  styleUrls: ['./selector-producto.component.css']
})
export class SelectorProductoComponent implements OnInit {

  public id;
  public selectores;
  public count_selec;
  public page;
  public pageSize = 12;
  public input_selector;
  public identity;

  constructor(
    private _selectorService : SelectorService,
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService: UserService,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        this.listar();
      }
      else{
        this._router.navigate(['/']);
      }
    }else{
      this._router.navigate(['/']);
    }
    
    
  }

  listar(){
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._selectorService.listar(this.id).subscribe(
          response=>{
            this.selectores = response.selectores; 
            this.count_selec = this.selectores.length;
            this.page = 1;
            console.log(this.selectores);
            
            
          },
          error=>{

          }
        )
      }
    );
  }

  onSubmit(selectForm){
    if(selectForm.valid){
      this._selectorService.registro({titulo: this.input_selector,producto:this.id}).subscribe(
        response =>{
          this.input_selector = '';
          this.listar();
        },
        error=>{

        }
      )
      
    }else{

    }
  }

  eliminar(id){
    this._selectorService.eliminar(id).subscribe(
      response=>{
        this.listar();
      },
      error =>{

      }
    );
  }

}
