import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/LoginUser';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const data: LoginUser = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.auth.login(data).subscribe((response: User) => {
      if (response) {
        localStorage.setItem('login', JSON.stringify(response));
        this.router.navigateByUrl('/');
      }
      console.log(response);
    });
  }

  toggleFieldTextType() {
    const passwordInput = $('#password') as JQuery<HTMLInputElement>;

    if (passwordInput.attr('type') === 'password') {
      passwordInput.attr('type', 'text');
    } else {
      passwordInput.attr('type', 'password');
    }
  }

  isError(field: string): boolean {
    const formControl = this.loginForm.get(field);
    return !!formControl?.errors && formControl.dirty;
  }
}
