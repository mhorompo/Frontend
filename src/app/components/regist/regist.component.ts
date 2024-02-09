import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  registForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordagain: ['', [Validators.required, Validators.minLength(6), this.passwordMatchValidator]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      roleEnum: ['', [Validators.required]],
    }, {validator: this.passwordMatchValidator});
  }

  ngOnInit() {
    this.registForm.patchValue({
      roleEnum: 'USER',
    });
  }

  regist() {
    const data: SignupUser = {
      email: this.registForm.get('email')?.value,
      password: this.registForm.get('password')?.value,
      firstName: this.registForm.get('firstName')?.value,
      lastName: this.registForm.get('lastName')?.value,
      roleEnum: this.registForm.get('roleEnum')?.value,
    };
    this.auth.regist(data).subscribe((response: User) => {
      if (response) {
        localStorage.setItem('login', JSON.stringify(response));
        this.router.navigateByUrl('/');
      }
      console.log(response);
    });
  }

  isError(field: string): boolean {
    const formControl = this.registForm.get(field);
    return !!formControl?.errors && formControl.dirty;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordagain')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
