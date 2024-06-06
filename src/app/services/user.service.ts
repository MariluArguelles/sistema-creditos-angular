import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment1';
import { endpoint } from '@shared/apis/endpoint';
import { User } from '../responses/user/user.response';
import { map } from 'rxjs/operators';
import { UserRequest } from '../requests/user/user.request';
import { getIcon } from '@shared/functions/helpers';
import { BaseApiResponse, BaseResponse } from '@shared/models/base-api-response.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

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

    const requestUrl = `${env.api}${endpoint.LIST_USERS}?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;
 
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
              e.badgeColor = 'text-gray- bg-gray-light' 
              break
          }
          e.icEdit = getIcon("icEdit", "Editar usuario", true);
          e.icDelete = getIcon("icDelete", "Eliminar usuario", true);
        })
        return data
      })
    )
  }

  UserRegister(user: UserRequest): Observable<BaseResponse> {
    
    const requestUrl = `${env.api}${endpoint.USER_REGISTER}`
    return this._http.post(requestUrl, user).pipe(
      map((resp: BaseResponse) => {
        return resp
      })
    )
  }

  UserById(UserId: number): Observable<User> {
    const requestUrl = `${env.api}${endpoint.USER_BY_ID}${UserId}`
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data
      })
    )
  }

  UserEdit(UserId: number, user: UserRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.USER_EDIT}${UserId}`
    return this._http.put(requestUrl, user).pipe(
      map((resp: BaseResponse) => {
        return resp
      })
    )
  }


}
