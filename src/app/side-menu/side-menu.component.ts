import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
faTimes = faTimes

  constructor() { }

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
