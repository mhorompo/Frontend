import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(): boolean {
    const logged = this.authService.isLoggedIn();
    if (!logged) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}
