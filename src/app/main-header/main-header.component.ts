import { Component, OnInit } from '@angular/core';
import {
  faBook,
  faUserCircle,
  faBars,
  faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {
  faBook = faBook;
  faUserCircle = faUserCircle;
  faBars = faBars;
  menuState: string = 'in';
  faStarHalfAlt=faStarHalfAlt;

  constructor() {}

  ngOnInit(): void {}

}
