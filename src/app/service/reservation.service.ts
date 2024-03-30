import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  baseUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  reserveAccommodation(accommodationId: number, data: any){
    let id;
    const userDataString = localStorage.getItem('login');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.id;
      id = userId;
    }

    return this.http.post(`${this.baseUrl}/reservation/reserveAccommodation/${id}/${accommodationId}`, data);
  }

  getAllReservationsByAccommodationId(id: number) {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservation/getAllReservationsById/${id}`);
  }
}
