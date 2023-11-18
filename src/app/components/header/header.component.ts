import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    // Ellenőrizze a görgetési pozíciót
    const scrollPosition = window.pageYOffset;

    // Állítsa be a sticky állapotot az éppen görgetés helyzetétől függően
    this.isSticky = scrollPosition >= 50; // Például, ha a görgetési pozíció eléri a 50 pixeles küszöbértéket
  }
}
