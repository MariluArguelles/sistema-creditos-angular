import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '@shared/shared.module';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { BottonPDFComponent } from '@shared/components/reusables/botton-pdf/botton-pdf.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryManageComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    ListTableComponent,
    ExportExcelComponent,
    BottonPDFComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
  ]
})
export class CategoryModule { }
