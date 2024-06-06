import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { componentSettings } from './user-list-config';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatesFilter } from '@shared/functions/actions';
import { BaseApiResponse } from '@shared/models/base-api-response.interface';
import { UserManageComponent } from '../user-manage/user-manage.component';
import Swal from 'sweetalert2';
import { FiltersBox } from '@shared/models/search-options.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'vex-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    stagger40ms, scaleIn400ms, fadeInRight400ms
  ]
})

export class UserListComponent implements OnInit {
  component

  constructor(customTitle: CustomTitleService, public _userService: UserService,
    public _dialog: MatDialog
  ) {
    customTitle.set('User')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }

  setData(value: number) {
    this.component.filters.stateFilter = value
    this.formatGetInputs()
  }
  
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
    this._dialog.open(UserManageComponent, {
      disableClose: true, //nose puede cerrar tocando fuera del dialog
      width: '400px'
    }).afterClosed().subscribe(
      (res) => {
        if (res) { //si guardó que actualice los datos de la tabla 
          this.setGetInputsProviders(true);
        }
      });
  }
  
  rowClick(e: any) {
    let action = e.action
    let user = e.row

    switch (action) {
      case "edit":
        this.UserEdit(user)
        break
    }
    return false
  }

  UserEdit(row: BaseApiResponse) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = row

    let dialogRef = this._dialog.open(UserManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: '400px'
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



  setGetInputsProviders(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadExcelUrl() {
    return `User?Download=true&DownloadType=Excel`;
  }
  get getDownloadPDFUrl() {
    return `User?Download=true&DownloadType=PDF`;
  }

}
