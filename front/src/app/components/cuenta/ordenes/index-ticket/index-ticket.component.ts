import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from "src/app/services/GLOBAL";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TicketService } from "src/app/services/ticket.service";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-ticket',
  templateUrl: './index-ticket.component.html',
  styleUrls: ['./index-ticket.component.css']
})
export class IndexTicketComponent implements OnInit {

  public identity;
  public url;
  public id;
  public tickets : any = {};
  public msm_error_review = '';

  public data_titulo='';

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private _ticketService : TicketService
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    
    if(this.identity){
      this.url = GLOBAL.url;
      this._route.params.subscribe(
        params=>{
          this.id = params['id'];
          this.listar(this.id);
        }
      );
    }else{
      this._router.navigate(['/']);
    }
  }

  listar(id){
    this._ticketService.listar(id).subscribe(
      response =>{
        this.tickets = response.tickets;
        console.log(this.tickets);
        
      },
      error=>{

      }
    );
  }

  createTicket(ticketForm){
    if(ticketForm.valid){
      let data = {
        tema : this.data_titulo,
        venta : this.id,
        user : this.identity._id,
      }
      this._ticketService.registro(data).subscribe(
        response =>{
          this.msm_error_review = '';
          this.data_titulo = '';
          this.listar(this.id);
          $('#form-modal').modal('hide');
          $('.modal-backdrop').removeClass('show');
        },
        error=>{
          console.log(error);
          
        }
      );
      
    }else{
      this.msm_error_review = 'Ingrese el tema del ticket.'
    }
  }

  close_alert(){
    this.msm_error_review = '';

  }
}
