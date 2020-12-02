import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from "src/app/services/GLOBAL";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TicketService } from "src/app/services/ticket.service";
import * as io from "socket.io-client";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-chat-ticket',
  templateUrl: './chat-ticket.component.html',
  styleUrls: ['./chat-ticket.component.css']
})
export class ChatTicketComponent implements OnInit, DoCheck {

  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;

  public identity: any = {};
  public url;
  public id;
  public msm = '';
  public msm_error=false;
  public mensajes : Array<any> = [];
  public poster_admin;
  public ticket : any = {};
  public socket = io('http://localhost:4201');
  public close_ticket = false;
  public estado_ticket;

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
          
        }
      );
  
      this.socket.on('new-formmsm', function (data) {
        if(data.data){
          this._ticketService.get_ticket(this.id).subscribe(
            response =>{
              this.ticket = response.ticket;
              this.estado_ticket = this.ticket.estado;
              
              
            },
            error=>{
      
            }
          );
        }
      }.bind(this)); 
  
      this.socket.on('new-mensaje', function (data) {
        this.mensajes = [];
        this.listar_msms();
  
      }.bind(this)); 
  
      this.listar_msms();
  
      this._userService.get_user('5ef640b75ee066601c6ed1c0').subscribe(
        response =>{
          console.log(response);
          this.poster_admin = response.user.perfil;
        },
        error=>{
  
        }
      );
  
      this._ticketService.get_ticket(this.id).subscribe(
        response =>{
          this.ticket = response.ticket;
          this.estado_ticket = this.ticket.estado;
          
          
        },
        error=>{
  
        }
      );
      
    }else{
      this._router.navigate(['/']);
    }

    
    
    
  }

  ngDoCheck(): void {
    
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  
  listar_msms(){
    this._ticketService.data(this.identity._id,'5ef640b75ee066601c6ed1c0').subscribe(
      response=>{
        
        response.mensajes.forEach(element => {
          if(element.ticket == this.id){
            this.mensajes.push(element);
          }
        });
        this.scrollToBottom();
        console.log(this.mensajes);
        
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  sendMessage(msmForm){
    if(msmForm.valid){
      
      if(this.close_ticket){
        //  enviar y cerrar ticket
        let data={
          de:this.identity._id,
          para:'5ef640b75ee066601c6ed1c0',
          msm:msmForm.value.msm,
          ticket:this.id,
          status: 0,
          estado: 0
        }
        this._ticketService.send(data).subscribe(
          response =>{
            console.log(response);
            this.msm = '';
            this.socket.emit('save-mensaje', {new:true});
            this.scrollToBottom();
            this.socket.emit('save-formmsm', {data:true});
          },
          error=>{
            console.log(error);
            
          }
        );
      }
      else{
        let data={
          de:this.identity._id,
          para:'5ef640b75ee066601c6ed1c0',
          msm:msmForm.value.msm,
          ticket:this.id,
          status: 0,
          estado: null
        }
        this._ticketService.send(data).subscribe(
          response =>{
            console.log(response);
            this.msm = '';
            this.socket.emit('save-mensaje', {new:true});
            this.scrollToBottom();
          },
          error=>{
            console.log(error);
            
          }
        );
      }
    }else{
      this.msm_error =true;
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
