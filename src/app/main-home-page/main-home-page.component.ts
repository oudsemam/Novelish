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
  slideIndex = 1;


  constructor(private NyTservice: NyTimesService) { }

  ngOnInit(): void {
    this.subscription = this.NyTservice.getList("Hardcover Fiction").subscribe(list => this.bookList = list);
    console.log(this.bookList)
  };

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  // slideLeft() {
  //   this.slideIndex += 

  // }
  // showDivs(slideIndex);

  // plusDivs(n) {
  //   showDivs(slideIndex += n);
  }
// }






// function showDivs(n) {
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   if (n > x.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = x.length} ;
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   x[slideIndex-1].style.display = "block";
// }
