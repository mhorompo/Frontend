import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccommodationComponent } from './view-accommodation.component';

describe('ViewAccommodationComponent', () => {
  let component: ViewAccommodationComponent;
  let fixture: ComponentFixture<ViewAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAccommodationComponent]
    });
    fixture = TestBed.createComponent(ViewAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
