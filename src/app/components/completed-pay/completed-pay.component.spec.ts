import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPayComponent } from './completed-pay.component';

describe('CompletedPayComponent', () => {
  let component: CompletedPayComponent;
  let fixture: ComponentFixture<CompletedPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedPayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
