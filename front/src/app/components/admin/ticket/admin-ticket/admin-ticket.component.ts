import { Component, OnInit } from '@angular/core';
import { TicketService } from "src/app/services/ticket.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin-ticket',
  templateUrl: './admin-ticket.component.html',
  styleUrls: ['./admin-ticket.component.css']
})
export class AdminTicketComponent implements OnInit {

  public tickets : any = {};
  public page;
  public pageSize = 30;
  public count_cat;
  public identity;

  constructor(
    private _ticketService : TicketService,
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
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
    this._ticketService.get_tickets_admin(null,null).subscribe(
      response =>{
        console.log(response);
        this.tickets = response;
        this.count_cat = this.tickets.tickets.length;
        this.page = 1;
      },
      error=>{
        console.log(error);
        
      }
    );
  }

}
