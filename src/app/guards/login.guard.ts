import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private cookies:CookieService, private router:Router){}

  canActivate():boolean{
    const token = this.cookies.get("x_token")
    if (token){
      return true
    }
    this.router.navigate(['login'])
    return false
    }
  
}
