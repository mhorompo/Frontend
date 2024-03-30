import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationWithId } from 'src/app/model/AccommodationWithId';
import { AccommodationService } from 'src/app/service/accommodation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-accommodations',
  templateUrl: './list-accommodations.component.html',
  styleUrls: ['./list-accommodations.component.css']
})
export class ListAccommodationsComponent implements OnInit {
  constructor(private accommodationService: AccommodationService, private router: Router) { }

  click(id: number) {
    this.router.navigate(['/viewAccommodation/' + id]);
  }

  editAccommodation(arg0: any) {
    this.router.navigate(['/editAccommodation/' + arg0]);
  }

  deleteAccommodation(arg0: number) {
    this.accommodationService.deleteAccommodation(arg0).subscribe(
      response => {
        Swal.fire({
          icon: "success",
          title: "Accommodation Deleted!",
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {
          window.location.reload();
        }, 1100);
      },
      error => {
        console.error('An error occured while deleting accommodation: ', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: error
        });
      }
    );
  }

  accommodations: AccommodationWithId[] | undefined;

  ngOnInit(): void {
    this.accommodationService.getAllAccommodationByUserId().subscribe(a => {
      this.accommodations = a;
    })
  }

  delete(accommodationId: number) {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to Delete the Accommodation?",
      showCancelButton: true,
      confirmButtonText: `
        <i class="fas fa-trash"></i> Delete!
      `,
      confirmButtonColor: '#d33',
      cancelButtonText: `<i class="fa-solid fa-ban"></i> Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          showConfirmButton: false,
          timer: 1000
        });
        this.deleteAccommodation(accommodationId);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }
}
