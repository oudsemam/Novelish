import { Component, OnInit, NgZone } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
faTimes = faTimes

  constructor(public authService: AuthService,
    public router: Router,
    public ngZone: NgZone) { }

  ngOnInit(): void {
  }

  search(){
    // if(this.book)
    // {console.log("in search")
    //   this.subscription = this.OLService.searchTitle(this.searchTerm)
    // .subscribe(()=>{
    //   this.router.navigate(['/results'])
    // })}
  }}
