import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NyTimesService } from '../ny-times.service';
import { CarouselModule } from 'primeng/carousel';

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
  isbn: any;
  
  public slides = [];


  constructor(private NyTservice: NyTimesService) { }

  ngOnInit(): void {
    this.subscription = this.NyTservice.getList("Combined Print and E-Book Fiction").subscribe(list => {
      console.log(list);
      this.slides = list.results.books.map((book: any) => {
        const url = `http://covers.openlibrary.org/b/isbn/${book.primary_isbn10}-M.jpg`;
        const isbn = book.primary_isbn10;
      console.log(url);
      return {url, isbn};
      }) 
      this.bookList1 = list});

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

  }

