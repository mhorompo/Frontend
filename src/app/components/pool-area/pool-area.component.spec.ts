import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolAreaComponent } from './pool-area.component';

describe('PoolAreaComponent', () => {
  let component: PoolAreaComponent;
  let fixture: ComponentFixture<PoolAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoolAreaComponent]
    });
    fixture = TestBed.createComponent(PoolAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
