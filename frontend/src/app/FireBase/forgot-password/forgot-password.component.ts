import { Component, OnInit } from '@angular/core';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../shared/services/auth.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
faBookReader = faBookReader;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
