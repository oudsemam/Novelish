import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewToggleButtonComponent } from './review-toggle-button.component';

describe('ReviewToggleButtonComponent', () => {
  let component: ReviewToggleButtonComponent;
  let fixture: ComponentFixture<ReviewToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewToggleButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
