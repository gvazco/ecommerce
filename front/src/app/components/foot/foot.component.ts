import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { CongeneralService } from 'src/app/services/congeneral.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import * as io from "socket.io-client";
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-foot',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.css']
})
export class FootComponent implements OnInit {

  public general: any = {};
  public url;
  public data_subcategorias:any=[];
  public categorias;
  public socket = io('http://localhost:4201');
  public subtotal : any = 0;
  public identity;
  public carrito : any = {};
  
  constructor(
    private _userService: UserService,
    private _congeneralService : CongeneralService,
    private _categoriaService :CategoriaService,
    private _carritoService:CarritoService,
  ) { 
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.data_categorias();
    this._congeneralService.get_data().subscribe(
      response =>{
        this.general = response.data;
      },
      error=>{
        
      }
    );

    this.socket.on('new-carrito', function (data) {
      this.subtotal = 0;
      this.show_Carrito();

    }.bind(this)); 
    this.show_Carrito();
  }

  show_Carrito(){
    this._carritoService.preview_carrito(this.identity._id).subscribe(
      response =>{
        this.carrito = response.carrito;

        this.carrito.forEach(element => {
          this.subtotal = this.subtotal + (element.precio*element.cantidad);
        });
        
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  data_categorias(){
    this._categoriaService.listar('').subscribe(
      response=>{
        this.categorias = response.categorias; 
    
        response.categorias.forEach(element1 => {
          element1.subcategorias.split(',').forEach(element2 => {
            this.data_subcategorias.push({subcategoria : element2,categoria:element1.nombre});
          });

        });
        
        

      },
      error =>{

      }
    );
  }

}
