import { Component, OnInit } from '@angular/core';
import { faDumpsterFire } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  faDumpsterFire = faDumpsterFire;

  constructor() { }

  ngOnInit(): void {
  }

}
