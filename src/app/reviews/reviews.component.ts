import { Component, OnInit } from '@angular/core';
import {
  faStar,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
faStar=faStar;

  constructor() { }

  ngOnInit(): void {
  }

}
