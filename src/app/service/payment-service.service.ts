import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl: string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  registerPayment(reservationId: string, data: any) {
    let id;
    const userDataString = localStorage.getItem('login');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      id = userData.id;
    }

    // UTC időt ad vissza, például "2025-03-22T12:34:56.789Z"
    // split 'T' vel ellehet kuloniteni
    let currentDate = new Date().toISOString().split('T')[0]

    return this.http.post(`${this.baseUrl}/payment/registerPayment/${id}/${currentDate}/${reservationId}`, data);
  }
}
