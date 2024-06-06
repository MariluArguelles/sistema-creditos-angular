import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseApiResponse, BaseResponse } from '@shared/models/base-api-response.interface';
import { environment as env } from 'src/environments/environment1';
import { endpoint, httpOptions } from '@shared/apis/endpoint';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private user:BehaviorSubject<ApiResponse>;
  //Ayuda a compartir datos entre componentes y mantiene el  estado de nuestra aplicación
  private user:BehaviorSubject<BaseApiResponse>; 
  
  public get userToken():BaseApiResponse{
    return this.user.value;
  }

  constructor(private http:HttpClient ) {
    this.user = new BehaviorSubject<BaseApiResponse>(
      JSON.parse(localStorage.getItem("token"))
    );
   }

  
  login(req:Login,authType:string):Observable<BaseResponse>{
    localStorage.setItem("authType","Interno");
    const requestUrl =`${env.api}${endpoint.LOGIN}?authType=${authType}`;
    return this.http.post<BaseResponse>(requestUrl,req,httpOptions).pipe(
      map((resp:BaseResponse) => {
        if(resp.isSuccess){
          localStorage.setItem("token",JSON.stringify(resp.data))
          this.user.next(resp.data);
        }
        return resp;
      })
    );
  }

  LoginWithGoogle(credential:string,authType:string): Observable<BaseResponse>{
    localStorage.setItem("authType","Externo");
    const requestUrl = `${env.api}${endpoint.LOGIN_GOOGLE}?authType=${authType}`;
    return this.http
    .post<BaseResponse>(requestUrl,JSON.stringify(credential),httpOptions)
    .pipe(  
      map((resp:BaseResponse) => {
        if(resp.isSuccess){
          localStorage.setItem("token",JSON.stringify(resp.data));
          this.user.next(resp.data);
        }
        return resp;
      }))
     }

     logout(){
      localStorage.removeItem("token");
      localStorage.removeItem("authType");
      this.user.next(null);
      window.location.reload();
     }

  }

