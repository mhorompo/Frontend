import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/LoginUser';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    const data: LoginUser = {
      email: this.email,
      password: this.password
    }
    this.auth.login(data).subscribe((response: User) => {
      if (response) {
        localStorage.setItem('login', JSON.stringify(response));
        this.router.navigateByUrl("/");
      }
      console.log(response);
    })
  }

  toggleFieldTextType() {
    const passwordInput = $("#password") as JQuery<HTMLInputElement>;

    if (passwordInput.attr("type") === "password") {
      passwordInput.attr("type", "text");
    } else {
      passwordInput.attr("type", "password");
    }
  }
}
