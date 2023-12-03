import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../model/LoginUser';
import { SignupUser } from '../model/Signupuser';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  regist(data: SignupUser) {
    return this.http.post<User>(`${this.baseUrl}/user/signup`, data)
  }

  login(data: LoginUser) {
    return this.http.post<User>(`${this.baseUrl}/user/login`, data)
  }

  isLoggedIn() {
    const login = localStorage.getItem('login');
    if (login) {
      return true;
    } else return false;
  }

  isAccomodation() {
    const login = localStorage.getItem('login');
    if (login) {
      const loginJSON: User = JSON.parse(login);
      if (loginJSON.roleEnum == 'ACCOMODATION') {
        return true;
      }
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }

  update(data: SignupUser, id: number) {
    return this.http.put<User>(`${this.baseUrl}/user/update/${id}`, data)
  }
}
