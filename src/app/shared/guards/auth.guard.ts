import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, 
    private authService: AuthService) {

  }
  //aqui se activa y desactiva el Loguin
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    | boolean | UrlTree {

    const user = this.authService.userToken
    if(user){
      return true
    } 
    //que no tenga loguin
  //  this.router.navigate(["/customer"]); 
   // return true;
   //que tenga loguin
    this.router.navigate(["/login"]);
    return false;
  }

}
