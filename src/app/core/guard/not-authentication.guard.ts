import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class NotAuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  canActivate(): boolean {
    if (!this.authenticationService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/todo-list']);
    return false;
  }
}
