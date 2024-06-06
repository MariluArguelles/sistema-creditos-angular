import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { CustomerListToSalesComponent } from './customer-list-to-sales/customer-list-to-sales.component';
import { CustomerSalesManagerComponent } from './customer-sales-manager/customer-sales-manager.component';
import { PointOfSaleComponent } from './point-of-sale/point-of-sale.component';
import { CustomerListToSales2Component } from './customer-list-to-sales2/customer-list-to-sales2.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    CustomerListToSalesComponent,
    CustomerSalesManagerComponent,
    PointOfSaleComponent,
    CustomerListToSales2Component
  ],
  imports: [
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    SalesRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent
    
  ]
})
export class SalesModule { }
