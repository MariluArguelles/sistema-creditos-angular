import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { componentSettings } from './product-list-config';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatesFilter } from '@shared/functions/actions';
import { BaseApiResponse } from '@shared/models/base-api-response.interface';
import { ProductManageComponent } from '../product-manage/product-manage.component';
import Swal from 'sweetalert2';
import { FiltersBox } from '@shared/models/search-options.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'vex-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    stagger40ms, scaleIn400ms, fadeInRight400ms
  ]
})

export class ProductListComponent implements OnInit {
  component

  constructor(customTitle: CustomTitleService, public _productService: ProductService,
    public _dialog: MatDialog
  ) {
    customTitle.set('Product')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }

  setData(value: number) {
    this.component.filters.stateFilter = value
    this.formatGetInputs()
  }
  //Para filtrar por Nombre o descripción
  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue
    this.component.filters.textFilter = data.searchData
    this.formatGetInputs()
  }

  datesFilterOpen() {
    DatesFilter(this)
  }

  formatGetInputs() {
    let str = "";
    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }
    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }
    if (this.component.filters.startDate != "" &&
      this.component.endDate != "") { //filtrar por fechas
      str += `&starDate=${this.component.filters.starDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }
    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }
    this.component.getInputs = str;
  }


  openDialogRegister() {
    this._dialog.open(ProductManageComponent, {
      disableClose: true, //nose puede cerrar tocando fuera del dialog
      width: '500px'
    }).afterClosed().subscribe(
      (res) => {
        if (res) { //si guardó que actualice los datos de la tabla 
          this.setGetInputsProviders(true);
        }
      });
  }

  rowClick(e: any) {
    let action = e.action
    let product = e.row

    switch (action) {
      case "edit":
        this.ProductEdit(product)
        break
      case "remove":
        this.ProductRemove(product)
        break
    }
    return false
  }

  ProductEdit(row: BaseApiResponse) {

    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = row

    let dialogRef = this._dialog.open(ProductManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: '500px'
    })
    dialogRef
      .afterClosed().subscribe(
        (res) => {
          if (res) {
            this.setGetInputsProviders(true);
          }
        }
      )
  }

  ProductRemove(product: any) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el product ${product.name}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: 'rgb(210,155,253)',
      cancelButtonColor: 'rgb(79,109,253)',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      width: 430
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.ProductRemove(product.productId)
          .subscribe(() => this.setGetInputsProviders(true))
      }
    });
  }

  setGetInputsProviders(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadExcelUrl() {
    return `Product?Download=true&DownloadType=Excel`;
  }
  get getDownloadPDFUrl() {
    return `Product?Download=true&DownloadType=PDF`;
  }



}
