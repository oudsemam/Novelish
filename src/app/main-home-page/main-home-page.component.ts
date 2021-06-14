import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NyTimesService } from '../ny-times.service';

@Component({
  selector: 'app-main-home-page',
  templateUrl: './main-home-page.component.html',
  styleUrls: ['./main-home-page.component.css'],
  providers: [NyTimesService]
})
export class MainHomePageComponent implements OnInit {
  
  subscription: Subscription | null = null;
  bookList: any;
  


  constructor(private NyTservice: NyTimesService) { }

  ngOnInit(): void {
    this.subscription = this.NyTservice.getList("Hardcover Fiction").subscribe(list => this.bookList = list);
    console.log(this.subscription)
  };

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

}
