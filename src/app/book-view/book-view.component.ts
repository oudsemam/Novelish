import { Component, Input, OnInit } from '@angular/core';
import { faDumpsterFire, faPlus, faPlusCircle, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"
import { NovelishBackendService } from '../novelish-backend.service';
import { OpenLibraryService } from '../open-library.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css'],
})
export class BookViewComponent implements OnInit {
  faStarHalfAlt = faStarHalfAlt;
  faPlus = faPlus;
  faDumpsterFire = faDumpsterFire;
  toggle:boolean = false;
  // status;

  book: any = null
  isbn: any = null
  reviews: any
  OLSubscription: Subscription | null = null
  NBSubscription: Subscription | null = null
  reviewSubscription: Subscription | null = null
  subscription1: Subscription | null = null;
  UISubscription: Subscription | null = null;
  user_id: any = null;
  shelf: any = null;
  result: any = null;
  book_id: any = null;

  constructor(
    private backend: NovelishBackendService,
    private OLService: OpenLibraryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // this.OLSubscription = this.activatedRoute.paramMap
    // 	.pipe(switchMap(p => this.OLService.getBook(p.get('ibsn'))))
    // 	.subscribe((book) => {
    //     console.log(book)
    //     this.book = book});
    // console.log(this.book)


    this.activatedRoute.paramMap.subscribe(params => {
      this.isbn = params.get('isbn')
      this.user_id = params.get('uid')
    })

    this.OLSubscription = this.OLService.getBook(this.isbn)
      .subscribe((book) => {
        console.log(book)
        this.book = book[`ISBN:${this.isbn}`]
      });

    this.reviewSubscription = this.backend.getReviewsByBook(this.isbn).subscribe((reviews) => {
      this.reviews = reviews
    })

    // this.UISubscription = this.backend.

  }
  reviewIt() {


    this.reviewSubscription = this.backend
      .getReviewsByBook(this.isbn)
      .subscribe((reviews) => {
        this.reviews = reviews;
      });
  }

  addToWantShelf() {
    this.OLSubscription = this.OLService.getBook(this.isbn)
    .subscribe((book) => {
      console.log(book)
      this.book = book[`ISBN:${this.isbn}`]
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.user_id = params.get('uid')
    })

    console.log("in the function")
    const wantBook = {
      shelf: "want",  
      user_id: this.user_id, 
      book_id: this.book,
      isbn: this.isbn };
      console.log(wantBook);
      console.log("I am here")
    this.subscription1 = this.backend.addBookToShelf(wantBook.book_id, wantBook.shelf).subscribe((book) => {
      this.book = book
      console.log(book)
      // this.user_id = user_id
      this.router.navigate([`/books/${this.user_id}/${this.shelf}`]);
      console.log(wantBook);
      console.log("now I am here")
    })


  }

  addToBurnShelf() {
    this.backend.addBookToShelf(this.isbn, 'burn');
    this.enableDisable();

    console.log("burned it");
    // this.backend.addBookToShelf(this.isbn, "burn")
  }

  addToReadShelf() {
    // this.backend.addBookToShelf(this.isbn, "read")
  }

  addToCurrentShelf() {
    // this.backend.addBookToShelf(this.isbn, "current")
  }

  addToDNFShelf() {
    // this.backend.addBookToShelf(this.isbn, "DNF")

  }

  enableDisable() {
    this.toggle = !this.toggle;
    this.toggle ? 'Enable' : 'Disable';
  }
}
