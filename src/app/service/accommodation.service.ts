import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation } from 'src/app/model/Accommodation';
import { AccommodationWithId } from '../model/AccommodationWithId';
import { DateData } from '../model/DateData';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  baseUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  addAccommodation(data: Accommodation) {
    const userDataString = localStorage.getItem('login');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.id;
      data.userId = +userId; // A + operátor az azonosítót számként kezeli
      console.log(userId);
    }
    return this.http.post<Accommodation>(`${this.baseUrl}/accommodation/addAcc`, data);
  }

  getAccommodations(): Observable<AccommodationWithId[]> {
    return this.http.get<AccommodationWithId[]>(`${this.baseUrl}/accommodation/getAllAccommodations`);
  }

  getAccommodationById(id: number): Observable<AccommodationWithId> {
    return this.http.get<AccommodationWithId>(`${this.baseUrl}/accommodation/getAcc/${id}`);
  }

  getAllAccommodationByUserId(): Observable<AccommodationWithId[]> {
    let id;
    const userDataString = localStorage.getItem('login');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.id;
      id = userId;
    }
    return this.http.get<AccommodationWithId[]>(`${this.baseUrl}/accommodation/getAllAccommodationByUserId/${id}`);
  }

  updateAccomodation(data: Accommodation, accommodationId: number) {
    return this.http.put<Accommodation>(`${this.baseUrl}/accommodation/updateAccommodation/${accommodationId}`, data);
  }

  deleteAccommodation(accommodationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/accommodation/deleteAccommodation/${accommodationId}`);
  }

  uploadImage(formData: FormData, id: number) {
    return this.http.post(`${this.baseUrl}/image/uploadImage/${id}`, formData);
  }

  updateImage(formData: FormData, id: number) {
    return this.http.put(`${this.baseUrl}/image/updateImage/${id}`, formData);
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.baseUrl}/image/getImage/${id}`, { observe: 'body', responseType: 'blob' as 'json' });
  }

  newReservation(userId: number, accommodationId: number, data: DateData) {
    return this.http.post(`${this.baseUrl}/reservation/reserveAccommodation/${userId}/${accommodationId}`, data);
  }
}
