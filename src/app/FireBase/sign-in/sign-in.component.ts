import { Component, OnInit } from '@angular/core';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../shared/services/auth.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  faBookReader = faBookReader;
  
  constructor(
    public authService: AuthService
    ) {}

  ngOnInit(): void {}
}
