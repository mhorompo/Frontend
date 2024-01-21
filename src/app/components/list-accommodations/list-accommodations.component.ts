import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationWithId } from 'src/app/model/AccommodationWithId';
import { AccommodationService } from 'src/app/service/accommodation.service';

@Component({
  selector: 'app-list-accommodations',
  templateUrl: './list-accommodations.component.html',
  styleUrls: ['./list-accommodations.component.css']
})
export class ListAccommodationsComponent implements OnInit{
  
  constructor(private accommodationService: AccommodationService, private router: Router) {}

  click(id: number) {
      this.router.navigate(['/viewAccommodation/' + id]);
    }

  editAccommodation(arg0: any) {
    this.router.navigate(['/editAccommodation/' + arg0]);
  }

  deleteAccommodation(arg0: number) {
    // Elküldjük a szervernek a törlési kérést
    this.accommodationService.deleteAccommodation(arg0).subscribe(
      response => {
        console.log(response);
        // A szükséges navigáció (vissza az előző oldalra vagy más helyre)
        window.location.reload();
      },
      error => {
        console.error('An error occured while deleting accommodation: ', error);
      }
    );
  }

  accommodations: AccommodationWithId[] | undefined;

  ngOnInit(): void {
    this.accommodationService.getAllAccommodationByUserId().subscribe(a => {
      console.log(a);
      this.accommodations = a;
    })
  }
}
