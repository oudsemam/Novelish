import { Component, Input, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notes-or-reviews',
  templateUrl: './notes-or-reviews.component.html',
  styleUrls: ['./notes-or-reviews.component.css'],
})
export class NotesOrReviewsComponent implements OnInit {
  faTimes = faTimes;

  @Input() note: string = '';
  newNoteItem: string;
  noteList: string[] = [];

  addNewNote() {
    if (this.newNoteItem !== null) {
      this.noteList?.push(this.newNoteItem);
    }
    this.newListItem = '';
  }

  removeNoteItem() {
    
  };

  constructor() {}

  ngOnInit(): void {}
}
