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
  bookList1: any;
  bookList2: any;
  bookList3: any;
  
  public slides = [
    { src: "../assets/byzantium.jpg"},
    { src: "../assets/Patrick.jpg"},
    { src: "../assets/thehobbit.jpg"},
    { src: "../assets/LOTR.gif"},
  ];


  constructor(private NyTservice: NyTimesService) { }

  ngOnInit(): void {
    this.subscription = this.NyTservice.getList("Combined Print and E-Book Fiction").subscribe(list => this.bookList1 = list);
    console.log(this.bookList1);
    // this.bookList1.some((bookList1)=>bookList1.isbn[0] === )

    this.subscription = this.NyTservice.getList("Combined Print and E-Book Nonfiction").subscribe(list => this.bookList2 = list);

    this.subscription = this.NyTservice.getList("Graphic Books and Manga").subscribe(list => this.bookList3 = list);

    
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
