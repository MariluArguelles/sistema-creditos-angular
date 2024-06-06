import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentsComponent } from './payments/payments.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/shared.module';
import { BottonPDFStandarComponent } from '@shared/components/reusables/botton-pdf-standar/botton-pdf-standar.component';
import { BottonPDFComponent } from '@shared/components/reusables/botton-pdf/botton-pdf.component';


@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MatGridListModule,
    MatCardModule,
    SharedModule,
    BottonPDFStandarComponent,
    BottonPDFComponent  
  ]
})
export class PaymentModule { }
