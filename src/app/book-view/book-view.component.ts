import { Component, Input, OnInit } from '@angular/core';
import { faChevronDown, faDumpsterFire, faPlus, faPlusCircle, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"
import { NovelishBackendService } from '../novelish-backend.service';
import { OpenLibraryService } from '../open-library.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css'],
})
export class BookViewComponent implements OnInit {
  faStarHalfAlt = faStarHalfAlt;
  faPlus = faPlus;
  faDumpsterFire = faDumpsterFire;

  faChevronDown = faChevronDown;
  showFire: boolean = false;
  showReviewForm: boolean = false;
  expandDetails: boolean = false;
  expandReviews: boolean = false;
  book: any = null;
  isbn: any = null;
  reviews: any;
  OLSubscription: Subscription | null = null;
  NBSubscription: Subscription | null = null;
  reviewSubscription: Subscription | null = null;
  subscription1: Subscription | null = null;
  UISubscription: Subscription | null = null;
  user_id: any = null;
  shelf: any = null;
  result: any = null;
  book_id: any = null;
  email: any = null;

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

    this.activatedRoute.paramMap.subscribe((params) => {
      this.isbn = params.get('isbn');
      this.user_id = params.get('uid');
    });

    this.OLSubscription = this.OLService.getBook(this.isbn).subscribe(
      (book) => {
        console.log(book);
        this.book = book[`ISBN:${this.isbn}`];
      }
    );

    this.reviewSubscription = this.backend
      .getReviewsByBook(this.isbn)
      .subscribe((reviews) => {
        this.reviews = reviews;
      });
  }
  reviewIt() {
    this.reviewSubscription = this.backend
      .getReviewsByBook(this.isbn)
      .subscribe((reviews) => {
        this.reviews = reviews;
      });
  }


  addToShelf(shelf:string) {
    const book = {   
      title: this.book.title,
      author: this.book.authors,
      isbn: this.isbn,
      // progress: req.body.progress,
    };
    this.backend.addBookToShelf(book, shelf).subscribe(() => {})
  }

  

  }
}
