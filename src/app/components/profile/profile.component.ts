import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupUser } from 'src/app/model/Signupuser';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regist',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {

  roleEnum: string = '';
  id?: number;

  profileForm: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const login = localStorage.getItem('login');
    if (login) {
      const loginJSON: User = JSON.parse(login);
      this.profileForm.patchValue({
        email: loginJSON.email,
        password: loginJSON.password,
        firstName: loginJSON.firstName,
        lastName: loginJSON.lastName,
      });
      this.id = loginJSON.id;
      this.roleEnum = loginJSON.roleEnum;
    }
  }

  update() {
    const data: SignupUser = {
      email: this.profileForm.get('email')?.value,
      password: this.profileForm.get('password')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      roleEnum: this.roleEnum
    };

    this.auth.update(data, this.id as number).subscribe((response: User) => {
      localStorage.setItem('login', JSON.stringify(response));
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    });
  }

  isError(field: string): boolean {
    return this.profileForm.get(field)?.errors != null;
  }

  toggleFieldTextType() {
    const passwordInput = $('#password') as JQuery<HTMLInputElement>;

    if (passwordInput.attr('type') === 'password') {
      passwordInput.attr('type', 'text');
    } else {
      passwordInput.attr('type', 'password');
    }
  }
}
