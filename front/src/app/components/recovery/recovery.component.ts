import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  public email = '';
  public msm_error = '';
  public codigo = '';
  public state = 1;
  public new_password = ''

  constructor(
    private _userService : UserService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  recovery(recoveryForm){
    if(recoveryForm.valid){
      this._userService.set_recovery_token(this.email).subscribe(
        response =>{
          console.log(response);
          this.state = 2;
          this.msm_error = '';
        },
        error=>{
          this.msm_error = error.error.message;
        }
      );
    }else{
      this.msm_error = 'Ingrese un correo valido por favor.'
    }
  }

  verify(verifyForm){
    if(verifyForm.valid){
      this._userService.verify_token(this.email, this.codigo).subscribe(
        response =>{
          console.log(response);
          
          if(response.data){
            this.state = 3;
            this.msm_error = '';
          }else{
            this.msm_error = 'El código ingresado no es el correcto, intente nuevamente.';
          }
          
        },
        error=>{
          console.log(error);
          this.msm_error = 'Ingrese el código para poder continuar.';
        }
      );
    }else{
      this.msm_error = 'Ingrese el código para poder continuar.';
    }
  }

  change_password(passwordForm){
    if(passwordForm.valid){
      if(this.new_password.length <= 7){
        this.msm_error = 'Ingrese la contraseña debe tener mas de 7 caracteres.';
      }else{
        this._userService.change_password(this.email,{password:this.new_password}).subscribe(
          response =>{
            console.log(response);
            this._router.navigate(['/login']);
          },
          error=>{
            console.log(error);
            
          }
        );
      }
    }else{
      this.msm_error = 'Ingrese la contraseña para poder continuar.';
    }
  }

  close_alert(){
    this.msm_error = '';
  }

}
