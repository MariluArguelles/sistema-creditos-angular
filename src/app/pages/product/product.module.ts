import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { SharedModule } from '@shared/shared.module';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { BottonPDFComponent } from '@shared/components/reusables/botton-pdf/botton-pdf.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductManageComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    BottonPDFComponent
  ]
})
export class ProductModule { }
