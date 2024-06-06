import { Component, OnInit, Inject } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import * as configs from '../../../../static-data/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'vex-customer-manage',
  templateUrl: './customer-manage.component.html',
  styleUrls: ['./customer-manage.component.scss']
})
export class CustomerManageComponent implements OnInit {

  icClose = icClose
  configs = configs
  form: FormGroup

  initForm(): void {
    this.form = this._fb.group({
      customerId: [0, [Validators.required]], //que comience en cero, que sea obligatorio
      name: ['', [Validators.required]],  //que comience vacío, que sea obligatorio
      lastName1: ['', [Validators.required]],
      lastName2: ['', ''],
      birthDate: ['', Validators.required],
      gender: ['', [Validators.required]],
      email: ['', ''],
      state: ['', [Validators.required]]
    })
  }


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _customerService: CustomerService,
    private _dialogRef: MatDialogRef<CustomerManageComponent> //para hacer seguimiento del dialog abierto actualmente
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) { //está cargándose data en el dialog al momento de inicializar el component
      console.log(this.data)
      this.CustomerIdById(this.data.data.customerId)
    }
  }

  CustomerIdById(CustomerId: number): void {
    this._customerService.CustomerById(CustomerId).subscribe( //se suscribe por que es un método observable 
      (resp) => {
        this.form.reset({
          customerId: resp.customerId,
          name: resp.name,
          lastName1: resp.lastName1,
          lastName2: resp.lastName2,
          birthDate: resp.birthDate,
          gender: resp.gender,
          email: resp.email,
          state: resp.state
        })
      }
    )
    return Object.values(this.form.controls).forEach((controls) => {
      controls.clearValidators(); //mosntrar mensajes de validación en controles inválidos
    })

  }

  //método para guardar o editar la categoría

  CustomerSave(): void {

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched(); //mosntrar mensajes de validación en controles inválidos
      })
    }
    const customerId = this.form.get('customerId').value
    if (customerId > 0) {

      this.CustomerEdit(customerId)
    }
    else {
      this.CustomerRegister()
    }
  }

  CustomerRegister(): void {

    this._customerService.CustomerRegister(this.form.value).subscribe((resp) => {

      if (resp.isSuccess) {

        this._alert.succes('Excelente', resp.message)//; error?
        this._dialogRef.close(true) //; error?
      } else {

        this._alert.warn('Atención', resp.message);
      }
    })
  }

  CustomerEdit(customerId: number): void {
    this._customerService.CustomerEdit(customerId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.succes('Excelente', resp.message) //; error?
        this._dialogRef.close(true) //; error?
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }

}
