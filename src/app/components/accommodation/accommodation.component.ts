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
  price: any;
  address: string | null | undefined;

  constructor(private accommodation: AccommodationService, private router: Router, private mapsAPILoader: MapsAPILoader) {
  }

  geocode(): Promise<void> {
    const address = `${this.streetName}, ${this.zipCode}, ${this.city}`;

    return new Promise<void>(async (resolve, reject) => {
      await this.mapsAPILoader.load();
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
          resolve();
        } else {
          console.error('Geocoding failed. Status:', status);
          reject();
        }
      });
    });
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const files: File = event.target.files[0];
    console.log(files);
    this.selectedFile = files;
  }

  addAcc() {
    this.geocode().then(() => {
      const data: Accommodation = {
        userId: this.userId,
        name: this.name,
        city: this.city,
        zipCode: this.zipCode,
        streetName: this.streetName,
        description: this.description,
        longitude: this.longitude,
        latitude: this.latitude,
        price: this.price
      };

      this.accommodation.addAccommodation(data).subscribe((response: Accommodation) => {
        if (response && response.id) {
          /*this.accommodation.uploadImage(formData, response.id).subscribe(uploadLog => {
            console.log(uploadLog);
          });*/
          this.router.navigateByUrl('/');
        }
        console.log(response);
      });
    });
  }

}
