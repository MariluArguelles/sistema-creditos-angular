import { Component, OnInit, Inject } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import * as configs from '../../../../static-data/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'vex-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  authType:string;
  mostrarPassword:boolean=true;
  icClose = icClose
  configs = configs
  form: FormGroup

  initForm(): void {
    mostrarPassword:true;
    this.form = this._fb.group({
      userId: [0, [Validators.required]], 
      userName: ['', [Validators.required,Validators.maxLength(30)]],  
      password: ['', []],  
      email: ['',[Validators.required,Validators.maxLength(30)]], 
      authType: ['Interno'], 
      state: ['', [Validators.required]]
    })
    this.authType = 'Interno';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<UserManageComponent> //para hacer seguimiento del dialog abierto actualmente
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) { //está cargándose data en el dialog al momento de inicializar el component
      console.log(this.data)
      this.UserById(this.data.data.userId)
    }
  }

  UserById(UserId: number): void {
    this._userService.UserById(UserId).subscribe( 
      (resp) => {
        this.form.reset({
          userId: resp.userId,
          userName: resp.userName,
          email: resp.email,
          authType:resp.authType, 
          state: resp.state
        })
        this.mostrarPassword=false;
        this.authType=resp.authType;

        Object.values(this.form.controls).forEach((control) => {
          control.markAsDirty();//de este modo validan actualizando
          control.updateValueAndValidity();
        });
      });
       /* return Object.values(this.form.controls).forEach((controls) => {
      controls.clearValidators(); //mosntrar mensajes de validación en controles inválidos
    //de este modo NO validan actualizando, error del profe
    })*/
  }

  //método para guardar o editar la categoría

  UserSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched(); //mosntrar mensajes de validación en controles inválidos
      })
    }
    const userId = this.form.get('userId').value
    if (userId > 0) {
      this.UserEdit(userId)
    }
    else {
      this.UserRegister()
    }
  }

  UserRegister(): void {
    console.log('antes de guardar');
    console.log(this.form.value);
    
    this._userService.UserRegister(this.form.value).subscribe((resp) => {
      console.log('después de guardar');
      if (resp.isSuccess) {
        this._alert.succes('Excelente', resp.message)//; error?
        this._dialogRef.close(true) //; error?
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }

  UserEdit(userId: number): void {
    this._userService.UserEdit(userId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.succes('Excelente', resp.message) //; error?
        this._dialogRef.close(true) //; error?
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }


}
