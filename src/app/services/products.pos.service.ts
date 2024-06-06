import { Injectable } from '@angular/core';
import { BaseApiResponse, Sales } from '../responses/sales/sales.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '@shared/services/alert.service';
import { environment as env } from 'src/environments/environment1';
import { endpoint } from "@shared/apis/endpoint";
import { map } from 'rxjs/operators';
import { getIcon } from '@shared/functions/helpers';

@Injectable({
    providedIn: 'root'
})
export class ProductPosService {

    constructor(private _http: HttpClient,
        private _alert: AlertService) { }

    GetAll(
        size, sort, order, page, getInputs
    ): Observable<BaseApiResponse> {

        const requestUrl = `${env.api}${endpoint.LIST_PRODUCTS}?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;

        return this._http.get<BaseApiResponse>(requestUrl).pipe(
            map((data: BaseApiResponse) => {

                data.data.items.forEach(function (e: any) {
                    e.salesCost = e.salesCost.replace(',', '.');
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
                })
                return data
            })
        )
    }
}