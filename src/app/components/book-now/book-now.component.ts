import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { AccommodationWithId } from 'src/app/model/AccommodationWithId';
import { Reservation } from 'src/app/model/Reservation';
import { User } from 'src/app/model/User';
import { AccommodationService } from 'src/app/service/accommodation.service';
import { PaymentService } from 'src/app/service/payment-service.service';
import { ReservationService } from 'src/app/service/reservation.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css'],
})
export class BookNowComponent {
  @ViewChild(MatStepper) stepper?: MatStepper;
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  profileForm: FormGroup;
  billingGroup: FormGroup;
  accommodation!: AccommodationWithId;
  sameChecked: boolean = false;
  selectedDays?: number;
  id: number = 0;
  amount?: number;
  currentDate: any;

  reservedDates: { startDate: string; endDate: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private router: Router,
    private reservationService: ReservationService,
    private paymentService: PaymentService
  ) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
    this.billingGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      selected: { startDate: moment(), endDate: moment() },
    });
  }

  isInvalidDate = (m: moment.Moment) => {
    for (const range of this.reservedDates) {
      var endDate = moment(range.endDate);
      var plusDay = endDate.clone();
      plusDay.add(1, 'd');

      if (m.isAfter(range.startDate) && m.isBefore(plusDay)) {
        return true; // A megadott dátum a tiltott tartományban van
      }
    }

    return false;
  };

  ngOnInit() {
    const login = localStorage.getItem('login');

    if (login) {
      const loginJSON: User = JSON.parse(login);
      this.profileForm.patchValue({
        email: loginJSON.email,
        firstName: loginJSON.firstName,
        lastName: loginJSON.lastName,
      });
    }
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
    }
    this.accommodationService
      .getAccommodationById(this.id)
      .subscribe((data: AccommodationWithId) => {
        this.accommodation = data;
      });

    //PayPal
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount?.toString(),
                  currency_code: 'HUF',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              //Database mentes, sikeres fizetes utan
              const data = {
                startDate: this.billingGroup
                  .get('selected')
                  ?.value.start.format('YYYY-MM-DD'),
                endDate: this.billingGroup
                  .get('selected')
                  ?.value.end.format('YYYY-MM-DD'),
                price: this.amount,
              };

              let reservationId = this.generateReservationID();

              this.reservationService
                .reserveAccommodation(this.accommodation.id, data)
                .subscribe((response) => {
                  console.log(response);
                });

              this.paymentService
                .registerPayment(reservationId, data)
                .subscribe((response) => {
                  console.log(response)
                });

              this

              Swal.fire({
                icon: 'success',
                title: 'Payment success',
                text: details.id,
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('/');
                }
              });
            }
          });
        },
        onError: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong :(',
            html: '<details> <summary> Show more detail </summary> ' + err.message + '</details>',
            showConfirmButton: true,
          });
        }
      })
      .render(this.paymentRef.nativeElement);

    //DatePicker
    this.currentDate = moment().format('YYYY-MM-DD');

    this.reservationService
      .getAllReservationsByAccommodationId(this.id)
      .subscribe((data: Reservation[]) => {
        for (const reservation of data) {
          this.reservedDates.push({
            startDate: reservation.startDate,
            endDate: reservation.endDate,
          });
        }
      });
  }

  //Form validacio
  isError(field: string, fg: FormGroup): boolean {
    return fg.get(field)?.errors != null;
  }

  copyPersonalData(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Copy personal data to billing data
      this.billingGroup.patchValue({
        firstName: this.profileForm.get('firstName')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        streetName: this.profileForm.get('streetName')?.value,
        city: this.profileForm.get('city')?.value,
        zipCode: this.profileForm.get('zipCode')?.value,
      });
    } else {
      // Clear billing data
      this.billingGroup.reset();
    }
  }

  //Kivalasztott datumtartomany, napokban visszaadva
  selectedRangeInDays(range: any) {
    this.amount =
      this.accommodation.price *
      range.endDate.diff(
        this.billingGroup.get('selected')?.value.start,
        'days'
      );
    this.selectedDays = range.endDate.diff(
      this.billingGroup.get('selected')?.value.start,
      'days'
    );
  }

  //Datum formazasa
  formatDate(date: any) {
    return date.format('YYYY. MM. DD');
  }

  //uuid generalasa
  generateReservationID(): string {
    return uuidv4(); // Példa: "3f2504e0-4f89-11d3-9a0c-0305e82c3301"
  }
}

