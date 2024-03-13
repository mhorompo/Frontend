import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MapsAPILoader } from '@ng-maps/core';
import { Accommodation } from 'src/app/model/Accommodation';
import { AccommodationService } from 'src/app/service/accommodation.service';
import Swal from 'sweetalert2';

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
  freeParking: boolean = false;
  airConditioning: boolean = false;
  barrierFree: boolean = false;
  breakfast: boolean = false;
  freeWifi: boolean = false;
  reception: boolean = false;
  editAcc: FormGroup;

  constructor(private route: ActivatedRoute, private accommodation: AccommodationService, private mapsAPILoader: MapsAPILoader, private fb: FormBuilder, private router: Router) {
    this.editAcc = this.fb.group({
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
          price: data.price,
          freeParking: data.freeParking,
          airConditioning: data.airConditioning,
          barrierFree: data.barrierFree,
          breakfastIncluded: data.breakfastIncluded,
          freeWifi: data.freeWifi,
          reception: data.reception
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
        price: this.editAcc.get("price")?.value,
        freeParking: this.editAcc.get("freeParking")?.value,
        airConditioning: this.editAcc.get("airConditioning")?.value,
        barrierFree: this.editAcc.get("barrierFree")?.value,
        breakfastIncluded: this.editAcc.get("breakfastIncluded")?.value,
        freeWifi: this.editAcc.get("freeWifi")?.value,
        reception: this.editAcc.get("reception")?.value
      }
      this.accommodation.updateAccomodation(data, this.accommodationId).subscribe((response: Accommodation) => {
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('image', this.selectedFile, this.selectedFile.name);
          this.accommodation.updateImage(formData, this.accommodationId).subscribe(uploadLog => {
            console.log(uploadLog);
          });
        }
        Swal.fire({
          icon: "success",
          title: "Accommodation Updated!",
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {
          this.router.navigateByUrl('/listAccommodations');
        }, 1000);
      });

    });
  }

  isError(field: string): boolean {
    const formControl = this.editAcc.get(field);
    return !!formControl?.errors && formControl.dirty;
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
