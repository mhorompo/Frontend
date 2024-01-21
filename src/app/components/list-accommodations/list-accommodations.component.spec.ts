import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccommodationsComponent } from './list-accommodations.component';

describe('ListAccommodationsComponent', () => {
  let component: ListAccommodationsComponent;
  let fixture: ComponentFixture<ListAccommodationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAccommodationsComponent]
    });
    fixture = TestBed.createComponent(ListAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
