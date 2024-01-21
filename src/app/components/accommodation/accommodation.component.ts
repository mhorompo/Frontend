import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@ng-maps/core';
import { Accommodation } from 'src/app/model/Accommodation';
import { AccommodationService } from '../../service/accommodation.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent {
  userId: number = 0;
  name: string = "";
  city: string = "";
  zipCode: string = "";
  streetName: string = "";
  description: string = "";
  longitude: number = 0.0;
  latitude: number = 0.0;
  mapsAPILoader: any;
  address: string | null | undefined;
  
  constructor(private accommodation: AccommodationService, private router: Router, mapsAPILoader: MapsAPILoader) { }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage(file);
  }

  uploadImage(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Most elküldjük a formData-t a szerverre
    this.accommodation.uploadImage(formData).subscribe(
      response => {
        console.log('Image uploaded successfully:', response);
        // Ha szükséges, itt további lépéseket tehetsz, például a szerver által visszaadott kép URL-jének kezelése
      },
      error => {
        console.error('Error uploading image:', error);
      }
    );
  }

  geocode() {
    const address = `${this.streetName}, ${this.zipCode}, ${this.city}`;
    this.mapsAPILoader.load().then(() => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.address }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          this.longitude = results[0].geometry.location.lat();
          this.latitude = results[0].geometry.location.lng();
        } else {
          console.error('Geocoding failed. Status:', status);
        }
      });
    });
  }

  addAcc() {
    this.geocode();
    
    const data: Accommodation = {
      userId: this.userId,
      name: this.name,
      city: this.city,
      zipCode: this.zipCode,
      streetName: this.streetName,
      description: this.description,
      longitude: this.longitude,
      latitude: this.latitude,
    };

    this.accommodation.addAccommodation(data).subscribe((response: Accommodation) => {
      if(response) {
        this.router.navigateByUrl('/');
      }
      console.log(response);
    });
  }

}
