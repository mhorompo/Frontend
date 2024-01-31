import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationWithId } from 'src/app/model/AccommodationWithId';
import { AccommodationService } from 'src/app/service/accommodation.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  accommodations: AccommodationWithId[] = [];

  constructor(private accommodationService: AccommodationService, private router: Router) { }

  ngOnInit() {
    this.accommodationService.getAccommodations().subscribe(acc => {
      this.accommodations = acc;
    });
  }

  click(id: number) {
    this.router.navigate(['/viewAccommodation/' + id]);
  }

  openDialog(id: number) {

  }

  closeDialog() {

  }
}
