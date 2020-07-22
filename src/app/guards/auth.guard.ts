import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate//, CanActivateChild 
{
  constructor(private router: Router, private tokenStorage: TokenStorageService) { }      
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
     if (this.isLoggedIn()) {  
      return true;    
     }      
     // navigate to login page as user is not authenticated      
      this.router.navigate(['/login']);      
    return false;      
    }     

  public isLoggedIn(): boolean {      
    let status = false;      
    if (window.sessionStorage.getItem('isLoggedIn') == "true") {      
      status = true;      
    }    
    else {      
      status = false;      
      }      
    return status;      
    }
  
  /*canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean|UrlTree {
    if (!this.isAdminUser) {
      console.log('You are not allowed to view this page');
      return false;
    }
    return true;
    }

    isAdminUser():boolean {
      if (this.tokenStorage.getUser().roles[0]=="Administrator") {
          return true; 
      }
      return false;
  }*/
}
