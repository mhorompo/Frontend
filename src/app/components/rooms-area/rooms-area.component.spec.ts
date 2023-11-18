import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsAreaComponent } from './rooms-area.component';

describe('RoomsAreaComponent', () => {
  let component: RoomsAreaComponent;
  let fixture: ComponentFixture<RoomsAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsAreaComponent]
    });
    fixture = TestBed.createComponent(RoomsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
