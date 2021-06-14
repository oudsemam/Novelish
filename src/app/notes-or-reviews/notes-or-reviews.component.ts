import { Component, Input, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notes-or-reviews',
  templateUrl: './notes-or-reviews.component.html',
  styleUrls: ['./notes-or-reviews.component.css'],
})
export class NotesOrReviewsComponent implements OnInit {
  @Input() note: string = '';
  newNote!: string;
  addedNotes: any[] = [];
  faTimes = faTimes;

  addNote() {
    if (this.newNote !== null) {
      this.addedNotes?.push(this.newNote);
    }
    this.newNote = '';
  }

  removeNote(i: number) {
    this.addedNotes.splice(i, 1);
  }
  constructor() {}

  ngOnInit(): void {}
}
