import { Component } from '@angular/core';
import { SignupUser } from 'src/app/model/Signupuser';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-regist',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  roleEnum: string = '';
  id?: number;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    const login = localStorage.getItem('login');
    if (login) {
      const loginJSON: User = JSON.parse(login);
      this.email = loginJSON.email;
      this.firstName = loginJSON.firstName;
      this.lastName = loginJSON.lastName;
      this.password = loginJSON.password;
      this.roleEnum = loginJSON.roleEnum;
      this.id = loginJSON.id;
    }

  }

  update() {
    const data: SignupUser = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      roleEnum: this.roleEnum
    }

    this.auth.update(data, this.id as number).subscribe((response: User) => {
      localStorage.setItem('login', JSON.stringify(response));
      window.location.reload();
      console.log(response);
    })
  }
}
