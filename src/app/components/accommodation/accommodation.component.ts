import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  freeParking: boolean = false;
  airConditioning: boolean = false;
  barrierFree: boolean = false;
  breakfast: boolean = false;
  freeWifi: boolean = false;
  reception: boolean = false;
  address: string | null | undefined;
  addAccommodation: FormGroup;

  constructor(private accommodation: AccommodationService, private router: Router, private mapsAPILoader: MapsAPILoader, private fb: FormBuilder) {
    this.addAccommodation = this.fb.group({
      name: ["", Validators.required],
      streetName: ["", Validators.required],
      city: ["", Validators.required],
      zipCode: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required],
      freeParking: false,
      airConditioning: false,
      barrierFree: false,
      breakfastIncluded: false,
      freeWifi: false,
      reception: false,
    });
  }

  geocode(): Promise<void> {
    const address = `${this.addAccommodation.get("streetName")?.value}, ${this.addAccommodation.get("zipCode")?.value}, ${this.addAccommodation.get("city")?.value}`;
    console.log(address);
    return new Promise<void>(async (resolve, reject) => {
      await this.mapsAPILoader.load();
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          console.log(results[0].geometry.location.lat());
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
    this.selectedFile = event.target.files[0];
  }

  addAcc() {
    this.geocode().then(() => {
      const data: Accommodation = {
        userId: 0,
        name: this.addAccommodation.get("name")?.value,
        city: this.addAccommodation.get("city")?.value,
        zipCode: this.addAccommodation.get("zipCode")?.value,
        streetName: this.addAccommodation.get("streetName")?.value,
        description: this.addAccommodation.get("description")?.value,
        longitude: this.longitude,
        latitude: this.latitude,
        price: this.addAccommodation.get("price")?.value,
        freeParking: this.addAccommodation.get("freeParking")?.value,
        airConditioning: this.addAccommodation.get("airConditioning")?.value,
        barrierFree: this.addAccommodation.get("barrierFree")?.value,
        breakfastIncluded: this.addAccommodation.get("breakfastIncluded")?.value,
        freeWifi: this.addAccommodation.get("freeWifi")?.value,
        reception: this.addAccommodation.get("reception")?.value
      };

      this.accommodation.addAccommodation(data).subscribe((response: Accommodation) => {
        if (response && response.id && this.selectedFile) {
          const formData = new FormData();
          formData.append('image', this.selectedFile, this.selectedFile.name);
          this.accommodation.uploadImage(formData, response.id).subscribe(uploadLog => {
            console.log(uploadLog);
          });
          this.router.navigateByUrl('/');
        }
        console.log(response);
      });
    });
  }
  isError(field: string): boolean {
    const formControl = this.addAccommodation.get(field);
    return !!formControl?.errors && formControl.touched;
  }
}
