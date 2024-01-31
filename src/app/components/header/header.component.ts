import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged?: boolean;
  isHost?: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLogged = this.auth.isLoggedIn();
    this.isHost = this.auth.isHost();
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }

  isScrolled: boolean = false;
  scrollThreshold: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > this.scrollThreshold;
  }
}
