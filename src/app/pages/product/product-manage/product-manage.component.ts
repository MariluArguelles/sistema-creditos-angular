import { Component, OnInit, Inject } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import * as configs from '../../../../static-data/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { ProductService } from 'src/app/services/product.service';
import { CategorySelect } from 'src/app/responses/product/product.response';

@Component({
  selector: 'vex-customer-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  categories: CategorySelect[];
  form: FormGroup

  initForm(): void {
    this.form = this._fb.group({
      productId: [0, ''],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      brand: ['', Validators.maxLength(50)],
      purchaseCost: ['', [Validators.required, Validators.max(99999.99)]],
      salesCost: ['', [Validators.required,Validators.max(99999.99)]],
      categoryId: ['', [Validators.required]],
      state: ['', [Validators.required]]
    })
  }


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<ProductManageComponent> //para hacer seguimiento del dialog abierto actualmente
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    
    this.listCategories();
    if (this.data != null) { //está cargándose data en el dialog al momento de inicializar el component
      this.ProductById(this.data.data.productId)
    }
  }

  listCategories(): void {
    this._productService.CategoryList().subscribe((resp) => {
      this.categories = resp;
    });
  }

  ProductById(ProductId: number): void {
    this._productService.ProductById(ProductId).subscribe( //se suscribe por que es un método observable 
      (resp) => {
        this.form.reset({
          productId: resp.productId,
          description: resp.description,
          brand: resp.brand,
          purchaseCost: resp.purchaseCost.replace(',', '.'),
          salesCost: resp.salesCost.replace(',', '.'),
          categoryId: resp.categoryId,
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

  CustomerSave(): void {
    
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched(); //mosntrar mensajes de validación en controles inválidos
      })
    }
    
      const productId = this.form.get('productId').value
      if (productId > 0) {
        this.ProductEdit(productId)
      }
      else {
        this.ProductRegister()
      }
    
  }

  ProductRegister(): void {

    this._productService.ProductRegister(this.form.value).subscribe((resp) => {

      if (resp.isSuccess) {

        this._alert.succes('Excelente', resp.message)//; error?
        this._dialogRef.close(true) //; error?
      } else {

        this._alert.warn('Atención', resp.message);
      }
    })
  }

  ProductEdit(productId: number): void {

    this._productService.ProductEdit(productId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.succes('Excelente', resp.message) //; error?
        this._dialogRef.close(true) //; error?
      } else {
        this._alert.warn('Atención', resp.message);
      }
    })
  }

}

