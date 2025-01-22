import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    }
    
    this.router.navigate(['/auth/login'], { replaceUrl: true, });
    return false;
  }
}
