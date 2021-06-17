import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NyTimesService } from '../ny-times.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() slides: any;

  subscription: Subscription | null = null;
  @Input() bookList1: any;
  @Input() bookList2: any;
  @Input() bookList3: any;

  currentSlide = 0;

  constructor(private NyTservice: NyTimesService) { }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

  ngOnInit(): void {
    // this.subscription = this.NyTservice.getList("Combined Print and E-Book Fiction").subscribe(list => this.bookList1 = list);
    // console.log(this.bookList1);
    // // this.bookList1.some((bookList1)=>bookList1.isbn[0] === )

    // this.subscription = this.NyTservice.getList("Combined Print and E-Book Nonfiction").subscribe(list => this.bookList2 = list);

    // this.subscription = this.NyTservice.getList("Graphic Books and Manga").subscribe(list => this.bookList3 = list);

    
  };

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  };

  // this.NyTservice.getList("Combined Print and E-Book Fiction").subscribe(list => {
  //   this.bookList1 = list;
  //   this.combinedImages = list.map((book: any) => ({path: `http://covers.openlibrary.org/b/isbn/${
  //     book.primary_isbn10}-M.jpg`}))
