import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  name:string = "Task Management"

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user:any = this.authService.credentials?.user
    this.name = (user && user?.firstName ? user?.firstName : "") + " " + (user && user?.lastName ? user?.lastName : '')
  }

  addTask() {
    this.router.navigate(['/task/add']);
  }

  doLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
