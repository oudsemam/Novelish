import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notes-or-reviews',
  templateUrl: './notes-or-reviews.component.html',
  styleUrls: ['./notes-or-reviews.component.css']
})
export class NotesOrReviewsComponent implements OnInit {
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

}
