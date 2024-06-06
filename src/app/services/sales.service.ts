import {  Injectable } from '@angular/core';
import { BaseApiResponse, SaleRequest, SaleResponse, Sales } from '../responses/sales/sales.interface';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '@shared/services/alert.service';
import { environment as env } from 'src/environments/environment1';
import { endpoint } from "@shared/apis/endpoint";
import { catchError, map } from 'rxjs/operators';
import { getIcon } from '@shared/functions/helpers';
import { BaseResponse } from '@shared/models/base-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  customerId:number

  constructor
    (
    private _http: HttpClient,
    private _alert: AlertService) { 
    }

  GetAll(
  size, sort, order, page, getInputs
  ): Observable<BaseApiResponse> {

     const requestUrl = `${env.api}${endpoint.LIST_SALES}?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}&${getInputs}`;
     
    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((data: BaseApiResponse) => {
        
        data.data.items.forEach(function (e: any) {
          e.total = '$ '+ e.total.replace(',', '.');
          e.balance ='$ '+ e.balance.replace(',', '.');
          e.paid = (e.paid == true) ? 'Si':'No';
          e.closed = (e.closed == true) ? 'Si':'No';
            
          switch (e.state) {
            case 0:
              e.badgeColor = 'text-gray bg-gray-light'
              break;
            case 1:
              e.badgeColor = 'text-green bg-green-light'
              break;
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break;
          }
          e.icSelect = getIcon("icSelect", "Seleccionar cliente", true);
        });
        
        return data;
      }),
      catchError(error => {
        console.error('Error al obtener datos de ventas:', error);
        return throwError('Error al obtener datos de ventas. Por favor, inténtelo de nuevo más tarde.');
      })
    );
  }

  async saveSale(Sale: Sales): Promise<number> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Sale),
    };
    const requestUrl = `${env.api}${endpoint.SALE_REGISTER}`;

    let saleId: number = 0;
    await fetch(requestUrl, requestOptions)
      .then(response => response.json())
      .then(data => { saleId = data.generatedId; })
      .catch(error => console.error('Error:', error));
    return saleId;
  }


  SaleById(SaleId: number): Observable<SaleResponse> {
    const requestUrl = `${env.api}${endpoint.SALE_BY_ID}${SaleId}`
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    )
  }

 
  //método repetido en payment.service.ts
  updatePreSale(data: Sales): Observable<any> {
    const sql = `${env.api}${endpoint.SALE_EDIT}${data.saleId}`;
   // console.log('**sql** '+sql)
   // console.log('**sql** '+JSON.stringify(data))
    return this._http.put(sql, data);
  }
  
}
