import { Component } from '@angular/core';

declare function load($: typeof jQuery): void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Palatin';
}
