import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupUser } from 'src/app/model/Signupuser';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcrypt';

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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      newPass: ['', [Validators.minLength(6)]],
      oldPass: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    const login = localStorage.getItem('login');
    if (login) {
      const loginJSON: User = JSON.parse(login);
      this.profileForm.patchValue({
        email: loginJSON.email,
        firstName: loginJSON.firstName,
        lastName: loginJSON.lastName,
      });
      this.id = loginJSON.id;
    }
  }

  update() {
    const data: SignupUser = {
      email: this.profileForm.get('email')?.value,
      password: this.profileForm.get('newPass')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      oldPass: this.profileForm.get('oldPass')?.value
    };

    this.auth.update(data, this.id as number).subscribe(
      (response: User) => {
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
    },
    (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    );
  }

  isError(field: string): boolean {
    return this.profileForm.get(field)?.errors != null;
  }

  toggleFieldTextType() {
    const passwordInput = $('#newPass') as JQuery<HTMLInputElement>;
    const oldPasswordInput = $('#oldPass') as JQuery<HTMLInputElement>;

    if (passwordInput.attr('type') === 'password') {
      passwordInput.attr('type', 'text');
      oldPasswordInput.attr('type', 'text');
    } else {
      passwordInput.attr('type', 'password');
      oldPasswordInput.attr('type', 'password');
    }
  }
}
