import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from '@shared/shared.module';
import { CustomerManageComponent } from './customer-manage/customer-manage.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { FilterDateRangeYmdComponent } from "@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component";
import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";
import { BottonPDFComponent } from '@shared/components/reusables/botton-pdf/botton-pdf.component';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerManageComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    ExportExcelComponent,
    BottonPDFComponent
  ]
})
export class CustomerModule { }
