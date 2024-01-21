import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationWithId } from 'src/app/model/AccommodationWithId';
import { AccommodationService } from 'src/app/service/accommodation.service';

@Component({
  selector: 'app-view-accommodation',
  templateUrl: './view-accommodation.component.html',
  styleUrls: ['./view-accommodation.component.css']
})
export class ViewAccommodationComponent {
  id: number = 0;
  accommodation!: AccommodationWithId;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
    }
    this.accommodationService.getAccommodationById(this.id).subscribe(data => {
      this.accommodation = data;
    });
  }
}
