import { Component, OnInit } from '@angular/core';
import { CongeneralService } from 'src/app/services/congeneral.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ContactoService } from 'src/app/services/contacto.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public url;
  public general;
  public contacto = {
    nombres:'',
    correo: '',
    telefono: '',
    tema:'',
    mensaje:''
  };
  public msm_success=false;
  public msm_error=false;

  constructor(
    private _congeneralService : CongeneralService,
    private _contactoService : ContactoService
  ) { 
    
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    
    this._congeneralService.get_data().subscribe(
      response =>{
        this.general = response.data;
      
        $('#horariosd').html(this.general.horarios.replace(/\r?\n/g, "<br />"));
        $('#direcciond').html(this.general.direccion.replace(/\r?\n/g, "<br />"));
        $('#iframe_mapa').html(this.general.iframe_mapa);
      },
      error=>{
        
      }
    );
  }

  
  onSubmit(contactoForm){
    

    if(!contactoForm.valid){
      this.msm_error = true;
      this.msm_success = false;
    }else{
      let data = {
        nombres:contactoForm.value.nombres,
        correo: contactoForm.value.correo,
        telefono: contactoForm.value.telefono,
        tema:contactoForm.value.tema,
        mensaje:contactoForm.value.mensaje
      }
 
      
      this._contactoService.registro(data).subscribe(
        response =>{
          
          this.contacto = {
            nombres:'',
            correo: '',
            telefono: '',
            tema:'',
            mensaje:''
          }
          this.msm_success = true;
          this.msm_error = false;
        },
        error=>{
      
          this.msm_success = false;
          this.msm_error = true;
        }
      );
    }
  }

}
