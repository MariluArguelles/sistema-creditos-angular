import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payments, SaleRequest, Sales } from 'src/app/responses/sales/sales.interface';
import { PaymentService } from '../../../services/payment.service';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { CoreService } from 'src/app/services/core.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerResponse } from '../../sales/customer-list-to-sales2/customer-list-to-sales2.component';
import { SalesService } from 'src/app/services/sales.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '@shared/models/base-api-response.interface';

@Component({
  selector: 'vex-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms]
})
export class PaymentsComponent implements OnInit {
  sales!: Sales[];
  customerId = 0;
  cliente = '';
  getDownloadPDFUrl: string
  getInputs: string = ''
  filename: string
  private Payment: Payments; // Ajusta el tipo según corresponda
  private balance: number = 0;


  constructor(
    private route: ActivatedRoute,
    private _paymentService: PaymentService,
    private _saleService: SalesService,
    private _coreService: CoreService,
    public _customerService: CustomerService,
  ) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.customerId = params['customerId'];
      }
      );
    this.getSalesList();
    this.getCustomerData();
  }

  getCustomerData(): void {
    this._customerService.CustomerById(this.customerId).subscribe(
      (resp: CustomerResponse) => {
        this.cliente = resp.name + ' ' + resp.lastName1;
      });
  }

  getSalesList() {
    const observable = this._paymentService.getSalesListToPay(this.customerId).subscribe
      (
        (data: Sales[]) => {
          this.sales = data;
          observable.unsubscribe();
        }
      );
  }


  onPay(p: Sales) {

    //SELECT CAST(REPLACE('99,999', ',', '') AS NUMERIC(7,2)) AS numeric_value;
    //límite del abono 500,000  --> numeric(9,2)
    let total_Paid:number=0;
    let balanceFlag: number = 0;
    let quantity: number = 0;
    quantity = parseFloat(p.value);
    balanceFlag = parseFloat(p.balance.toString());
    this.balance = Math.round((balanceFlag - quantity) * 100) / 100;
    
    //console.log('Saldo '+balanceFlag);
    //console.log('Abono '+p.value+', abono convertido '+quantity);
    //console.log('Nuevo saldo '+this.balance);
    
    if (p.value !== '' && quantity >= 0 && p.value != undefined && p.paymentDate != '' && p.paymentDate != undefined) {

      this.Payment = {
        saleId: p.saleId,
        quantity: quantity,
        balance: this.balance,
        paymentDate: p.paymentDate,
        description: 'Pago',
        state: 1
      }

      if (balanceFlag == 0) {
        this.Message('Esta cuenta ya se terminó de pagar');
      }
      else if (quantity == 0) {
        this.Message('Indique una cantidad para pagar')
      }
      else if (quantity > 500000) {
        this.Message('La cantidad $' + quantity + ' ha rebasado monto máximo de pago permitido (500,000)');
        return;
      }
      else if (this.balance < 0) {
        this.Message('Indique una cantidad menor o igual a su saldo ($' + balanceFlag + ')');
        return;
      }
      else {
        let err:boolean=false;

          const pagoOk = async () => {
            try {
              await this._paymentService.addPayment(this.Payment).toPromise();    
            } catch (error) {
              err = true;
              console.log('error');  // Maneja cualquier error que ocurra durante la operación
            }
          };
          
            pagoOk().then(() => { // Esta función se ejecutará después de que la operación asíncrona haya terminado
              
              if(!err){ //si hay un error no actualiza saldos

                total_Paid=Math.round((p.total - this.balance) * 100) / 100;
                p.totalPaid = total_Paid;//mandar al objeto 'p' para que actualice las etiquetas
              
                let pre: Sales =
              {
                customerId: this.customerId,
                saleId: p.saleId,
                registerDate: p.registerDate,
                subTotal: p.subTotal,
                total: p.total,
                balance: this.balance,//solo se actualiza este
                closed: true,
                paid: this.balance == 0,
                state: 1
              }
    
              const observable = this._saleService.updatePreSale(pre).subscribe(() => {
                observable.unsubscribe();
                this.Message('Pago registrado correctamente')
                p.paymentDate = '';
                p.value = '';
                this.updateSalesWithPayment(p, this.balance);
              });
              } 
              else {  this.Message('Hubo un error en la solicitud, no se guardaron los cambios'); }
            });
      }
    }
  }


  Message(msg: string) {
    this._coreService.openSnackBar(msg, 'done');
  }


  private updateSalesWithPayment(p: Sales, balance: number): void {
    // Buscas el índice del objeto Sales en el arreglo sales
    const index = this.sales.findIndex((pr) => pr.saleId === p.saleId);
    if (index !== -1) {
      // Verificar si Payments es undefined y asignar un arreglo vacío si es necesario
      const existingPayments = this.sales[index].payments || [];
      // Actualizas el objeto Sales con el nuevo Payment
      this.sales[index] = {
        ...this.sales[index],
        payments: [...existingPayments, this.Payment],
        //value: '',
      };
    }
    this.sales = this.updatePreSalesById(this.sales, p.saleId, { balance: balance });
  }

  private updatePreSalesById(preSalesArray: Sales[], id: number, updatedFields: Partial<Sales>): Sales[] {
    return preSalesArray.map((sale) => (sale.saleId === id ? { ...sale, ...updatedFields } : sale));
  }


}
function firstValueFrom(arg0: Observable<any>) {
  throw new Error('Function not implemented.');
}

