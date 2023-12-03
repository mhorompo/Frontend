import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupUser } from 'src/app/model/Signupuser';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css'],
})
export class RegistComponent {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  passwordagain: string = '';
  roleEnum: string = 'USER';

  constructor(private auth: AuthService, private router: Router) { }

  regist() {
    const data: SignupUser = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      roleEnum: this.roleEnum
    }
    this.auth.regist(data).subscribe((response: User) => {
      if (response) {
        localStorage.setItem('login', JSON.stringify(response));
        this.router.navigateByUrl("/");
      }
      console.log(response);
    })
  }
}
