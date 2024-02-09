import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@ng-maps/core';
import { Accommodation } from 'src/app/model/Accommodation';
import { AccommodationService } from 'src/app/service/accommodation.service';

@Component({
  selector: 'app-edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css']
})
export class EditAccommodationComponent implements OnInit {
  accommodationId: any;
  name: any;
  streetName: any;
  city: any;
  zipCode: any;
  latitude: any;
  longitude: any;
  description: any;
  price: any;
  editAcc: FormGroup;

  constructor(private route: ActivatedRoute, private accommodation: AccommodationService, private mapsAPILoader: MapsAPILoader, private fb: FormBuilder) {
    this.editAcc = this.fb.group({
      name: ["", Validators.required],
      streetName: ["", Validators.required],
      city: ["", Validators.required],
      zipCode: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required]
    });
  }

  ngOnInit() {
    // Feliratkozunk az ActivatedRoute paraméter változásaira
    this.route.params.subscribe(params => {
      // Az útvonal paraméterek között megkeressük az accommodationId-t
      this.accommodationId = +params['id'];

      // Ezt követően az accommodationId-t használhatjuk egy szolgáltatás vagy komponens metódusában
      this.loadAccommodationData();
    });
  }

  loadAccommodationData() {
    // Most meghívhatjuk a szolgáltatást, amely lekéri az adatokat az accommodationId alapján
    this.accommodation.getAccommodationById(this.accommodationId).subscribe(
      data => {
        // Az adatok beállítása a komponens mezőire
        this.editAcc.patchValue({
          name: data.name,
          streetName: data.streetName,
          city: data.city,
          zipCode: data.zipCode,
          description: data.description,
          price: data.price
        })
      },
      error => {
        console.error('Hiba történt az adatok lekérésekor:', error);
      }
    );
  }

  geocode(): Promise<void> {
    const address = `${this.editAcc.get("streetName")?.value}, ${this.editAcc.get("zipCode")?.value}, ${this.editAcc.get("city")?.value}`;

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

  editAccommodation() {
    this.geocode().then(() => {
      const data: Accommodation = {
        userId: 0,
        name: this.editAcc.get("name")?.value,
        streetName: this.editAcc.get("streetName")?.value,
        city: this.editAcc.get("city")?.value,
        zipCode: this.editAcc.get("zipCode")?.value,
        latitude: this.latitude,
        longitude: this.longitude,
        description: this.editAcc.get("description")?.value,
        price: this.editAcc.get("price")?.value
      }
      this.accommodation.updateAccomodation(data, this.accommodationId).subscribe((response: Accommodation) => {
        window.location.reload();
      });;
    });
  }

  isError(field: string): boolean {
    return this.editAcc.get(field)?.errors != null;
  }
}
