import { Component, OnInit, Inject } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import * as configs from '../../../../static-data/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'vex-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})

export class CategoryManageComponent implements OnInit {

  icClose = icClose
  configs = configs
  form: FormGroup

  initForm(): void {
    this.form = this._fb.group({
      categoryId: [0, [Validators.required]], //que comience en cero, que sea obligatorio
      name: ['', [Validators.required,Validators.maxLength(50)]],  //que comience vacío, que sea obligatorio
      description: ['',Validators.maxLength(100)], //que comience vacío
      state: ['', [Validators.required]]
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _categoryService: CategoryService,
    private _dialogRef: MatDialogRef<CategoryManageComponent> //para hacer seguimiento del dialog abierto actualmente
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) { //está cargándose data en el dialog al momento de inicializar el component
      console.log(this.data)
      this.CategoryById(this.data.data.categoryId)
    }
  }


  CategoryById(CategoryId: number): void {
    this._categoryService.CategoryById(CategoryId).subscribe( //se suscribe por que es un método observable 
      (resp) => {
        this.form.reset({
          categoryId: resp.categoryId,
          name: resp.name,
          description: resp.description,
          state: resp.state
        })
        Object.values(this.form.controls).forEach((control) => {
          control.markAsDirty();//de este modo validan actualizando
          control.updateValueAndValidity();
        });
      }
    );
   /* return Object.values(this.form.controls).forEach((controls) => {
      controls.clearValidators(); //mosntrar mensajes de validación en controles inválidos
    //de este modo NO validan actualizando, error del profe
    })*/

  }

  //método para guardar o editar la categoría

  CategorySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched(); //mosntrar mensajes de validación en controles inválidos
      })
    }
    const categoryId = this.form.get('categoryId').value
    if (categoryId > 0) {
      this.CategoryEdit(categoryId)
    }
    else {
      this.CategoryRegister()
    }
  }

  CategoryRegister(): void {

    this._categoryService.CategoryRegister(this.form.value).subscribe((resp) => {

      if (resp.isSuccess) {
        this._alert.succes('Excelente', resp.message)//; error?
        this._dialogRef.close(true) //; error?
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }

  CategoryEdit(categoryId: number): void {
    this._categoryService.CategoryEdit(categoryId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.succes('Excelente', resp.message) //; error?
        this._dialogRef.close(true) //; error?
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }

}
