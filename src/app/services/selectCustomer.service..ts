import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from 'src/environments/environment1';

@Injectable({
    providedIn: 'root'
})

export class SelectCustomerService {

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
                    e.icSelect = getIcon("icSelect", "Seleccionar cliente", true);
                    // e.icEdit = getIcon("icEdit", "Editar cliente", true);
                    // e.icDelete = getIcon("icDelete", "Eliminar cliente", true);
                })
                return data
            })
        )
    }
}