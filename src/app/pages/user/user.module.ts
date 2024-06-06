import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { SharedModule } from '@shared/shared.module';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { BottonPDFComponent } from '@shared/components/reusables/botton-pdf/botton-pdf.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserManageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ListTableComponent,
    ExportExcelComponent,
    BottonPDFComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent
  ]
})
export class UserModule { }
