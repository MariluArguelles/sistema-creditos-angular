import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment1';
import { endpoint } from '@shared/apis/endpoint';
import { Category } from '../responses/category/category.response';
import { map } from 'rxjs/operators';
import { CategoryRequest } from '../requests/category/category.request';
import { getIcon } from '@shared/functions/helpers';
import { BaseApiResponse, BaseResponse } from '@shared/models/base-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient,
    private _alert: AlertService
  ) {
  }

  GetAll(
    size,
    sort,
    order,
    page,
    getInputs
  ): Observable<BaseApiResponse> {

    const requestUrl = `${env.api}${endpoint.LIST_CATEGORIES}?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;
    //console.log('getInputs= '+getInputs);
    //const sql  = `https://localhost:7287/api/Category?NumFilter=3&StartDate=2023-10-19&EndDate=2023-10-19`;
    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((data: BaseApiResponse) => {
        
        data.data.items.forEach(function (e: any) {
          switch (e.state) {
            case 0:
              e.badgeColor = 'text-gray- bg-gray-light'
              break
            case 1:
              e.badgeColor = 'text-green- bg-green-light'
              break
            default:
              e.badgeColor = 'text-gray- bg-gray-light' //e.badgeColor = 'text-green- bg-green-light'  <= error?
              break
          }
          e.icEdit = getIcon("icEdit", "Editar categoría", true);
          e.icDelete = getIcon("icDelete", "Eliminar categoría", true);
        })
        return data
      })
    )
  }

  //para guardar una categoria
  CategoryRegister(category: CategoryRequest): Observable<BaseResponse> {
    
    const requestUrl = `${env.api}${endpoint.CATEGORY_REGISTER}`
    return this._http.post(requestUrl, category).pipe(
      map((resp: BaseResponse) => {
        return resp
      })
    )
  }

  CategoryById(CategoryId: number): Observable<Category> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_BY_ID}${CategoryId}`
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data
      })
    )
  }

  CategoryEdit(CategoryId: number, category: CategoryRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_EDIT}${CategoryId}`
    return this._http.put(requestUrl, category).pipe(
      map((resp: BaseResponse) => {
        return resp
      })
    )
  }

  CategoryRemove(CategoryId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.CATEGORY_REMOVE}${CategoryId}`
    return this._http.put(requestUrl, '').pipe(
      map((resp: BaseResponse) => {
        if (resp) {
          this._alert.succes('Excelente', resp.message)
        }
      })
    )
  }

}
