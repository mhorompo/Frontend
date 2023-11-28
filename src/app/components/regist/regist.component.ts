import { Component } from '@angular/core';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent {

  email: string='';
  firstname: string='';
  lastname: string='';
  password: string='';
  passwordagain: string='';

}
