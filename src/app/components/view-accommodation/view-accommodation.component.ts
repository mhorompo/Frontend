import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationWithId } from 'src/app/model/AccommodationWithId';
import { DateData } from 'src/app/model/DateData';
import { AccommodationService } from 'src/app/service/accommodation.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view-accommodation',
  templateUrl: './view-accommodation.component.html',
  styleUrls: ['./view-accommodation.component.css']
})
export class ViewAccommodationComponent {

  id: number = 0;
  accommodation!: AccommodationWithId;
  selected?: any;
  userId?: number;
  imageUrl: any;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
    }
    this.accommodationService.getAccommodationById(this.id).subscribe(data => {
      this.accommodation = data;
    });
    this.accommodationService.getImage(this.id).subscribe((data: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(data);
    });
  }

  formatDate(data: any) {
    // Év, hónap és nap kinyerése a Date objektumból
    let year = data.getFullYear();
    let month = String(data.getMonth() + 1).padStart(2, '0'); // A hónapok 0-tól kezdődnek, ezért +1, majd két számjegyű formátumra alakítjuk
    let day = String(data.getDate()).padStart(2, '0'); // Nap két számjegyű formátumra alakítása

    // A kívánt formátumú dátum összeállítása
    let result = `${year}-${month}-${day}`;

    return result;
  }

  newReservation() {
    if (this.selected.start && this.selected.end) {
      const login = localStorage.getItem('login');

      this.userId = this.auth.getLoggedInUserId() ?? -1;

      const data: DateData = {
        startDate: this.formatDate(this.selected.start.$d),
        endDate: this.formatDate(this.selected.end.$d)
      }

      this.accommodationService.newReservation(this.userId, this.accommodation.id, data).subscribe(response => {
        console.log(response);
      })
    }
  }

  book() {
    this.router.navigate(["/bookNow/" + this.accommodation.id]);
  }
}