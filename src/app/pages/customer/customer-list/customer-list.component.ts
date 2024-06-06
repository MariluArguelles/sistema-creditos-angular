import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { CustomerService } from 'src/app/services/customer.service';
import { componentSettings } from './customer-list-config';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatesFilter } from '@shared/functions/actions';
import { BaseApiResponse } from '@shared/models/base-api-response.interface';
import { CustomerManageComponent } from '../customer-manage/customer-manage.component';
import Swal from 'sweetalert2';
import { DateRange, FiltersBox } from '@shared/models/search-options.interface';

@Component({
  selector: 'vex-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  animations: [
    stagger40ms, scaleIn400ms, fadeInRight400ms
  ]
})

export class CustomerListComponent implements OnInit {
  component

  constructor(customTitle: CustomTitleService, public _customerService: CustomerService,
    public _dialog: MatDialog
  ) {
    customTitle.set('Cliente')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }


  setData(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
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

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
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
    this._dialog.open(CustomerManageComponent, {
      disableClose: true, //nose puede cerrar tocando fuera del dialog
      width: '600px'
    }).afterClosed().subscribe(
      (res) => {
        if (res) { //si guardó que actualice los datos de la tabla 
          this.setGetInputsProviders(true);
        }
      });
  }

  rowClick(e: any) {
    let action = e.action
    let customer = e.row

    switch (action) {
      case "edit":
        this.CustomerEdit(customer)
        break
      case "remove":
        this.CustomerRemove(customer)
        break
    }
    return false
  }

  CustomerEdit(row: BaseApiResponse) {

    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = row

    let dialogRef = this._dialog.open(CustomerManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: '600px'
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

  CustomerRemove(customer: any) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el cliente ${customer.name}?`,
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
        this._customerService.CustomerRemove(customer.categoryId)
          .subscribe(() => this.setGetInputsProviders(true))
      }
    });
  }

  setGetInputsProviders(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadExcelUrl() {
    return `Customer?Download=true&DownloadType=Excel`;
  }
  get getDownloadPDFUrl() {
    return `Customer?Download=true&DownloadType=PDF`;
  }


}
