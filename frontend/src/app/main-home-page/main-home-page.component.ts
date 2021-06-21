import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NyTimesService } from '../ny-times.service';
import { CarouselModule } from 'primeng/carousel';
import { NovelishBackendService } from '../novelish-backend.service';

@Component({
  selector: 'app-main-home-page',
  templateUrl: './main-home-page.component.html',
  styleUrls: ['./main-home-page.component.css'],
  providers: [NyTimesService],
})
export class MainHomePageComponent implements OnInit {
  subscription: Subscription | null = null;
  subscriptionList2: Subscription | null = null;
  subscriptionList3: Subscription | null = null;
  userSubscription: Subscription | null = null;

  bookList1: any;
  bookList2: any;
  bookList3: any;
  isbn: any;

  slides = [];
  slides2 = [];
  slides3 = [];

  constructor(
    private NyTservice: NyTimesService,
    private NovelishBackendService: NovelishBackendService,
  ) {}

  ngOnInit(): void {
    if (localStorage.user) {
      this.userSubscription = this.NovelishBackendService.addNewUser().subscribe(() => {});
    }

    this.subscription = this.NyTservice.getList(
      'Combined Print and E-Book Fiction'
    ).subscribe((list) => {
      console.log(list);
      this.slides = list.results.books.map((book: any) => {
        const url = `http://covers.openlibrary.org/b/isbn/${book.primary_isbn10}-M.jpg`;
        const isbn = book.primary_isbn10;
        console.log(url);
        return { url, isbn };
      });
      this.bookList1 = list;
    });

    console.log(this.bookList1);

    this.subscriptionList2 = this.NyTservice.getList(
      'Combined Print and E-Book Nonfiction'
    ).subscribe((list) => {
      console.log(list);
      this.slides2 = list.results.books.map((book: any) => {
        const url = `http://covers.openlibrary.org/b/isbn/${book.primary_isbn10}-M.jpg`;
        const isbn = book.primary_isbn10;
        console.log(url);
        return { url, isbn };
      });
      this.bookList2 = list;
    });

    this.subscriptionList3 = this.NyTservice.getList(
      'Graphic Books and Manga'
    ).subscribe((list) => {
      console.log(list);
      this.slides3 = list.results.books.map((book: any) => {
        const url = `http://covers.openlibrary.org/b/isbn/${book.primary_isbn10}-M.jpg`;
        const isbn = book.primary_isbn10;
        console.log(url);
        return { url, isbn };
      });
      this.bookList3 = list;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

