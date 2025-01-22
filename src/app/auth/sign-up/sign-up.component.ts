import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
    } else {
      const payload = this.signUpForm.value;
      this.authService.apiCall('post', '/auth/signup', payload).subscribe(
        (res: any) => {
          if (res) {
            this.router.navigateByUrl('/auth/login', { replaceUrl: true });
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
