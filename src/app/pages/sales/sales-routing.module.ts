import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointOfSaleComponent } from './point-of-sale/point-of-sale.component';
import { CustomerListToSalesComponent } from './customer-list-to-sales/customer-list-to-sales.component';

const routes: Routes = [
  {
    path: 'customerListToSales',
    component: CustomerListToSalesComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
