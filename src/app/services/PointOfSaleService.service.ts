import { Injectable } from '@angular/core';
import { BaseApiResponse, Sales, SaleItems } from '../responses/sales/sales.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '@shared/services/alert.service';
import { environment as env } from 'src/environments/environment1';
import { endpoint } from "@shared/apis/endpoint";
import { map } from 'rxjs/operators';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { SaleItemRequest } from '../requests/sale/sale.request';

@Injectable({
    providedIn: 'root'
})
export class PointOfSaleService {

    constructor(private _http: HttpClient,
        private _alert: AlertService) { }



    getSaleItems(preSaleId: number): Observable<SaleItems[]> {
        const requestUrl = `${env.api}${endpoint.LIST_SALE_ITEMS}?saleId=${preSaleId}`;

        // Retorna el observable de la solicitud GET
        return this._http.get<BaseApiResponse>(requestUrl).pipe(
            map((data: BaseApiResponse) => {
                // Extrae y devuelve el array de items desde la respuesta
                return data.data.items as SaleItems[];
            })
        );
    }

    SaleItemRegister(saleItem: SaleItemRequest): Observable<BaseResponse> {

        const requestUrl = `${env.api}${endpoint.SALE_ITEMS_REGISTER}`
        return this._http.post(requestUrl, saleItem).pipe(
            map((resp: BaseResponse) => {
                return resp
            })
        )
    }


}