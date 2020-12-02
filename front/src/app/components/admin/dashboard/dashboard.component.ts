import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { UserService } from 'src/app/services/user.service';import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ActivatedRoute, Router } from '@angular/router';
;
declare let Chart;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public total_mes = 0;
  public total_ventas = 0;
  public current_month;
  public last_month;
  public dinero_ganado = 0;
  public total_ventas_ant = 0;
  public total_ganado_ant = 0;
  public mes_anterior;
  public mes_actual;
  public num_user = 0;
  public current_year;
  public url;
  public last_sellers : Array<any> = [];
  public num_productos = 0;
  public num_ventas = 0;
  public num_comentarios = 0;

  public total_ganado = {
    enero : 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre:0,
  }

  public total_ganado_last = {
    enero : 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre:0,
  }
  public identity;
  

  constructor(
    private _ventaService : VentaService,
    private _userService : UserService,
    private _productoService: ProductoService,
    private _comentarioService : ComentarioService,
    private _router : Router,
    private _route :ActivatedRoute,
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {

    if(this.identity){
      if(this.identity.role == '12$MAhAAdPTi92gVknt8QyKIuEzcRYM6pa8.3RwTjFMfMwJvs2Jube'){
        const canvas = <HTMLCanvasElement> document.getElementById('myChart');
        const ctx = canvas.getContext('2d');


        var fecha = new Date();
          
        var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Novimbre", "Deciembre"];
        this.current_month = months[fecha.getMonth()];
        this.last_month = months[fecha.getMonth()-1]
        this.mes_anterior = fecha.getMonth();
        this.mes_actual =fecha.getMonth()+1;
        this.current_year = fecha.getFullYear();
        this._ventaService.get_data_dashboard().subscribe(
          response =>{
    
            response.data.forEach(element => {
              
              if(element.estado == 'Enviado' || element.estado == 'Venta en proceso'|| element.estado == 'Finalizado'){
               
                
                this.num_ventas = this.num_ventas + 1;

                  this.dinero_ganado = this.dinero_ganado + parseInt(element.total_pagado);
               
                
                  if(element.month == this.mes_actual && element.year == this.current_year){
                 
                    
                    this.total_ventas = this.total_ventas + 1;
                    this.total_mes = this.total_mes + element.total_pagado;
                  }
                  if(element.month == this.mes_anterior && element.year == this.current_year){
                    this.total_ganado_ant = this.total_ganado_ant+ element.total_pagado;
                    this.total_ventas_ant = this.total_ventas_ant + 1;
                  }

                  /*AÑO ACTUAL */
                  if(element.month == 1 && element.year == this.current_year){
                    this.total_ganado.enero = this.total_ganado.enero + element.total_pagado;
                  }
                  if(element.month == 2 && element.year == this.current_year){
                    this.total_ganado.febrero = this.total_ganado.febrero + element.total_pagado;
                  }
                  if(element.month == 3 && element.year == this.current_year){
                    this.total_ganado.marzo = this.total_ganado.marzo + element.total_pagado;
                  }
                  if(element.month == 4 && element.year == this.current_year){
                    this.total_ganado.abril = this.total_ganado.abril + element.total_pagado;
                  }
                  if(element.month == 5 && element.year == this.current_year){
                    this.total_ganado.mayo = this.total_ganado.mayo + element.total_pagado;
                  }
                  if(element.month == 6 && element.year == this.current_year){
                    this.total_ganado.junio = this.total_ganado.junio + element.total_pagado;
                  }
                  if(element.month == 7 && element.year == this.current_year){
                    this.total_ganado.julio = this.total_ganado.julio + element.total_pagado;
                  }
                  if(element.month == 8 && element.year == this.current_year){
                    this.total_ganado.agosto = this.total_ganado.agosto + element.total_pagado;
                  }
                  if(element.month == 9 && element.year == this.current_year){
                    this.total_ganado.septiembre = this.total_ganado.septiembre + element.total_pagado;
                  }
                  if(element.month == 10 && element.year == this.current_year){
                    this.total_ganado.octubre = this.total_ganado.octubre + element.total_pagado;
                  }
                  if(element.month == 11 && element.year == this.current_year){
                    this.total_ganado.noviembre = this.total_ganado.noviembre + element.total_pagado;
                  }
                  if(element.month == 12 && element.year == this.current_year){
                    this.total_ganado.diciembre = this.total_ganado.diciembre + element.total_pagado;
                  }

                  /*AÑO PASADO */
                  if(element.month == 1 && element.year == (this.current_year-1)){
                    this.total_ganado_last.enero = this.total_ganado_last.enero + element.total_pagado;
                  }
                  if(element.month == 2 && element.year == (this.current_year-1)){
                    this.total_ganado_last.febrero = this.total_ganado_last.febrero + element.total_pagado;
                  }
                  if(element.month == 3 && element.year == (this.current_year-1)){
                    this.total_ganado_last.marzo = this.total_ganado_last.marzo + element.total_pagado;
                  }
                  if(element.month == 4 && element.year == (this.current_year-1)){
                    this.total_ganado_last.abril = this.total_ganado_last.abril + element.total_pagado;
                  }
                  if(element.month == 5 && element.year == (this.current_year-1)){
                    this.total_ganado_last.mayo = this.total_ganado_last.mayo + element.total_pagado;
                  }
                  if(element.month == 6 && element.year == (this.current_year-1)){
                    this.total_ganado_last.junio = this.total_ganado_last.junio + element.total_pagado;
                  }
                  if(element.month == 7 && element.year == (this.current_year-1)){
                    this.total_ganado_last.julio = this.total_ganado_last.julio + element.total_pagado;
                  }
                  if(element.month == 8 && element.year == (this.current_year-1)){
                    this.total_ganado_last.agosto = this.total_ganado_last.agosto + element.total_pagado;
                  }
                  if(element.month == 9 && element.year == (this.current_year-1)){
                    this.total_ganado_last.septiembre = this.total_ganado_last.septiembre + element.total_pagado;
                  }
                  if(element.month == 10 && element.year == (this.current_year-1)){
                    this.total_ganado_last.octubre = this.total_ganado_last.octubre + element.total_pagado;
                  }
                  if(element.month == 11 && element.year == (this.current_year-1)){
                    this.total_ganado_last.noviembre = this.total_ganado_last.noviembre + element.total_pagado;
                  }
                  if(element.month == 12 && element.year == (this.current_year-1)){
                    this.total_ganado_last.diciembre = this.total_ganado_last.diciembre + element.total_pagado;
                  }
              }
              
            });

            new Chart('myChart', {
              type: 'line',
              options: {
                scales: {
                  yAxes: [{
                    ticks: {
                      maxTicksLimit: 6,
                      min: 0,
                      callback: function(value) {
                        return '$' + value + 'k';
                      }
                    }
                  }],
                  xAxes:[{
                    gridLines: { lineWidth: 0 },
                  }]
                }
              },
              data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                  label: 'Ganado ' + this.current_year,
                  borderColor: "rgba(44,123,229,1)",
                  backgroundColor : 'white',
                  fontColor : 'rgba(149, 170, 201 ,1)',
                  pointHoverBackgroundColor: 'white',
                  data: [this.total_ganado.enero, this.total_ganado.febrero, this.total_ganado.marzo, this.total_ganado.abril, this.total_ganado.mayo, this.total_ganado.junio, this.total_ganado.julio, this.total_ganado.agosto, this.total_ganado.septiembre, this.total_ganado.octubre, this.total_ganado.noviembre, this.total_ganado.diciembre]
                },
                {
                  label: 'Ganado ' + (parseInt(this.current_year) - 1),
                  borderColor: "#fe696a",
                  backgroundColor : 'white',
                  fontColor : 'rgba(149, 170, 201 ,1)',
                  pointHoverBackgroundColor: 'white',
                  data: [this.total_ganado_last.enero, this.total_ganado_last.febrero, this.total_ganado_last.marzo, this.total_ganado_last.abril, this.total_ganado_last.mayo, this.total_ganado_last.junio, this.total_ganado_last.julio, this.total_ganado_last.agosto, this.total_ganado_last.septiembre, this.total_ganado_last.octubre, this.total_ganado_last.noviembre, this.total_ganado_last.diciembre]
                }]
              }
            });
            
            
            
            
          },
          error=>{

          }
        );

        this.data_ventas();
        this._userService.get_user_data().subscribe(
          response =>{
           
            
            this.num_user = response.data.length;
          },
          error=>{

          }
        );
        
        this._productoService.listar_autocomplete().subscribe(
          response =>{
            this.num_productos = response.data.length;
          },
          error=>{

          }
        );
        
        this._comentarioService.listar().subscribe(
          response =>{
            this.num_comentarios = response.comentarios.length;
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


  data_ventas(){
    this.last_sellers = [];
    this._ventaService.get_detalle_hoy().subscribe(
      response =>{
        
        this.last_sellers = response.data;
      },
      error=>{

      }
    );
  }

}
