import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../responses/customer/customer.response';
import { environment as env } from 'src/environments/environment1';
import { endpoint } from '@shared/apis/endpoint';
import { map } from 'rxjs/operators';
import { BaseApiResponse, BaseResponse } from '@shared/models/base-api-response.interface';
import { getIcon } from '@shared/functions/helpers';
import { CustomerRequest } from '../requests/customer/customer.request';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private _http: HttpClient,
    private _alert: AlertService
  ) {
  }

  GetAll(
    size, sort, order, page, getInputs
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.LIST_CUSTOMERS}?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;
    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((data: BaseApiResponse) => {
        data.data.items.forEach(function (e: any) {
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
          e.icEdit = getIcon("icEdit", "Editar cliente", true);
          e.icDelete = getIcon("icDelete", "Eliminar cliente", true);
        })
        return data
      })
    )
  }

  GetCustomers( 
    size, sort, order, page, getInputs
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${endpoint.LIST_CUSTOMERS}?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`; 
    return this._http.get(requestUrl).pipe(
      map((data: BaseApiResponse) => {
        return data
      })
    )
  }


  //para guardar una categoria
  CustomerRegister(customer: CustomerRequest): Observable<BaseResponse> {
    console.log('customer ' + JSON.stringify(customer));
    const requestUrl = `${env.api}${endpoint.CUSTOMER_REGISTER}`
    return this._http.post(requestUrl, customer).pipe(
      map((resp: BaseResponse) => {
        return resp
      })
    )
  }

  CustomerById(CustomerId: number): Observable<CustomerResponse> {
    const requestUrl = `${env.api}${endpoint.CUSTOMER_BY_ID}${CustomerId}`
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data
      })
    )
  }

  CustomerEdit(CustomerId: number, customer: CustomerRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CUSTOMER_EDIT}${CustomerId}`
    return this._http.put(requestUrl, customer).pipe(
      map((resp: BaseResponse) => {
        return resp
      })
    )
  }

  CustomerRemove(CustomerId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.CUSTOMER_REMOVE}${CustomerId}`
    return this._http.put(requestUrl, '').pipe(
      map((resp: BaseResponse) => {
        if (resp) {
          this._alert.succes('Excelente', resp.message)
        }
      })
    )
  }

}
