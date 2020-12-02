import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from "src/app/services/GLOBAL";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TicketService } from "src/app/services/ticket.service";
import * as io from "socket.io-client";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {

  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;

  public identity: any = {};
  public url;
  public id;
  public msm = '';
  public usuario : any = {};
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
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        
          this.url = GLOBAL.url;
          this._route.params.subscribe(
            params=>{
              this.id = params['id'];

            }
          );

        

          this.socket.on('new-mensaje', function (data) {
            this.mensajes = [];
            this._ticketService.get_ticket(this.id).subscribe(
              response =>{
                this.ticket = response.ticket;
                this.estado_ticket = this.ticket.estado;
                this._userService.get_user(this.ticket.user).subscribe(
                  response =>{
                    this.usuario = response.user;
                    this.poster_admin = response.user.perfil; 
              
                    this.listar(this.usuario._id);
                  },
                  error=>{
                    console.log(error);
                    
                  }
                );
              },
              error=>{
              }
            );

          }.bind(this)); 
          
          this._ticketService.get_ticket(this.id).subscribe(
            response =>{
              this.ticket = response.ticket;
              this.estado_ticket = this.ticket.estado;
              this._userService.get_user(this.ticket.user).subscribe(
                response =>{
                  this.usuario = response.user;
                  this.poster_admin = response.user.perfil; 
            
                  this.listar(this.usuario._id);
                },
                error=>{
                  console.log(error);
                  
                }
              );
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

  listar(idusuario){
    this._ticketService.data('5ef640b75ee066601c6ed1c0',idusuario).subscribe(
      response=>{
        
        response.mensajes.forEach(element => {
          if(element.ticket == this.id){
            this.mensajes.push(element);
          }
        });
        this.scrollToBottom();
        
        
      },
      error=>{
       
        
      }
    );
  }


  sendMessage(msmForm){
    if(msmForm.valid){
    
      if(this.close_ticket){
        //  enviar y cerrar ticket
        let data={
          de:'5ef640b75ee066601c6ed1c0',
          para:this.usuario._id,
          msm:msmForm.value.msm,
          ticket:this.id,
          status: 1,
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
          de:'5ef640b75ee066601c6ed1c0',
          para:this.usuario._id,
          msm:msmForm.value.msm,
          ticket:this.id,
          status: 1,
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


  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
