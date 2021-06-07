import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesOrReviewsComponent } from './notes-or-reviews.component';

describe('NotesOrReviewsComponent', () => {
  let component: NotesOrReviewsComponent;
  let fixture: ComponentFixture<NotesOrReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesOrReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesOrReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
