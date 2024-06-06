import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { CategorySelect, Product } from '../responses/product/product.response';
import { environment as env } from 'src/environments/environment1';
import { endpoint } from '@shared/apis/endpoint';
import { map } from 'rxjs/operators';
import { BaseApiResponse, BaseResponse } from '@shared/models/base-api-response.interface';
import { getIcon } from '@shared/functions/helpers';
import { ProductRequest } from '../requests/product/product.request';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private _http: HttpClient,
        private _alert: AlertService
    ) {
    }

    GetAll(
        size, sort, order, page, getInputs
    ): Observable<BaseApiResponse> {

        const requestUrl = `${env.api}${endpoint.LIST_PRODUCTS}?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;

        return this._http.get<BaseApiResponse>(requestUrl).pipe(

            map((data: BaseApiResponse) => {

                data.data.items.forEach(function (e: any) {
                    e.purchaseCost ='$ '+ e.purchaseCost.replace(',', '.');
                    e.salesCost ='$ '+ e.salesCost.replace(',', '.');
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


    //para guardar una categoria
    ProductRegister(product: ProductRequest): Observable<BaseResponse> {
        product.description.trim();
        const requestUrl = `${env.api}${endpoint.PRODUCT_REGISTER}`
        return this._http.post(requestUrl, product).pipe(
            map((resp: BaseResponse) => {
                return resp
            })
        )
    }

    ProductById(ProductId: number): Observable<Product> {
        const requestUrl = `${env.api}${endpoint.PRODUCT_BY_ID}${ProductId}`
        return this._http.get(requestUrl).pipe(
            map((resp: BaseResponse) => {
                resp.data.description = resp.data.description.toString().trim();
                resp.data.brand = resp.data.brand.toString().trim();
                console.log(resp.data);
                return resp.data
            })
        )
    }

    CategoryList(): Observable<CategorySelect[]> {
        const requestUrl = `${env.api}${endpoint.LIST_SELECT_CATEGORIES}`
        return this._http.get(requestUrl).pipe(
            map((resp: BaseResponse) => {
                return resp.data
            })
        )
    }

    ProductEdit(ProductId: number, product: ProductRequest): Observable<BaseResponse> {
        product.description.trim();
        const requestUrl = `${env.api}${endpoint.PRODUCT_EDIT}${ProductId}`

        return this._http.put(requestUrl, product).pipe(
            map((resp: BaseResponse) => {
                return resp
            })
        )
    }

    ProductRemove(ProductId: number): Observable<void> {
        const requestUrl = `${env.api}${endpoint.PRODUCT_REMOVE}${ProductId}`
        return this._http.put(requestUrl, '').pipe(
            map((resp: BaseResponse) => {
                if (resp) {
                    this._alert.succes('Excelente', resp.message)
                }
            })
        )
    }

}
