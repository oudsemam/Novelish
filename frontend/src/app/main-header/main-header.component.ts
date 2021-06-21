import { Component, NgZone, OnInit } from '@angular/core';
import {
  faBook,
  faUserCircle,
  faBars,
  faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

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

  menuToggle: boolean = false;

  constructor(public authService: AuthService,
    public router: Router,
    public ngZone: NgZone) {}

  ngOnInit(): void {}

  hideShowMenu = () => {
    this.menuToggle = !this.menuToggle;
  }

}


