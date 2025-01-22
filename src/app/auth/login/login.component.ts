import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
    } else {
      const payload = this.loginForm.value;
      this.authService.login(payload).subscribe(
        (credentials: any) => {
          const userData = credentials.user;
          if (userData) {
            this.router.navigateByUrl('/todo-list', { replaceUrl: true });
          }
        },
        (error: any) => {
          if (error && error.error && error.error.message) {
            alert(error.error.message);
          }
        }
      );
    }
  }
}
