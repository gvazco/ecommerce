import { Component, OnInit } from '@angular/core';
import { GLOBAL } from "src/app/services/GLOBAL";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aside-cuenta',
  templateUrl: './aside-cuenta.component.html',
  styleUrls: ['./aside-cuenta.component.css']
})
export class AsideCuentaComponent implements OnInit {

  public url;
  public user : any = {};
  public identity;

  constructor(
    private _userService: UserService,
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    this.url = GLOBAL.url;
    this.get_data_user();
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
}
