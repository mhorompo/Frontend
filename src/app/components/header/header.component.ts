import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isSticky: boolean = false;
  isLogged?: boolean;
  isHost?: boolean;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    // Ellenőrizze a görgetési pozíciót
    const scrollPosition = window.pageYOffset;

    // Állítsa be a sticky állapotot az éppen görgetés helyzetétől függően
    this.isSticky = scrollPosition >= 40; // Például, ha a görgetési pozíció eléri a 50 pixeles küszöbértéket
  }

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isLogged = this.auth.isLoggedIn();
    this.isHost = this.auth.isHost();
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }
}
