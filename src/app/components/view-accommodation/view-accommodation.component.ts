import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationWithId } from 'src/app/model/AccommodationWithId';
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
  isLoggedIn?: boolean;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
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

  // newReservation() {
  //   if (this.selected.start && this.selected.end) {
  //     const login = localStorage.getItem('login');

  //     this.userId = this.auth.getLoggedInUserId() ?? -1;

  //     this.accommodationService.newReservation(this.userId, this.accommodation.id, data).subscribe(response => {
  //       console.log(response);
  //     })
  //   }
  // }

  book() {
    this.router.navigate(["/bookNow/" + this.accommodation.id]);
  }
}