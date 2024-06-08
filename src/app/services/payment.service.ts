import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiResponse, Payments, Sales } from '../responses/sales/sales.interface';
import { environment as env } from 'src/environments/environment1';
import { endpoint } from '@shared/apis/endpoint';
import { map } from 'rxjs/operators';
import { BaseResponse } from '@shared/models/base-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClient) {

  }

  getSalesListToPay(customerId: number): Observable<Sales[]> {
    const sql = `${env.api}${endpoint.LIST_FOR_PAYMENT}?CustomerId=${customerId}`;
    return this._http.get<BaseApiResponse>(sql).pipe(
      map((data: BaseApiResponse) => {
        // Extrae y devuelve el array de items desde la respuesta

      // Itera sobre cada registro y calcula totalPaid
      data.data.items.forEach((p: Sales) => {
        p.totalPaid = Math.round((p.total - p.balance) * 100) / 100;
      });

        return data.data.items as Sales[];
      })
    );
  }

  addPayment(data: Payments): Observable<any> {
    const sql = `${env.api}${endpoint.PAYMENT_REGISTER}`;
    return this._http.post(sql, data).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );

  }


}
