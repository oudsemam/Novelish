import { Component, Input, OnInit } from '@angular/core';
import { faDumpsterFire, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"
import { NovelishBackendService } from '../novelish-backend.service';
import { OpenLibraryService } from '../open-library.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  faStarHalfAlt=faStarHalfAlt;
  faDumpsterFire = faDumpsterFire;
  book: any = null
  isbn: any = null
  reviews: any 
  OLSubscription: Subscription | null = null
  NBSubscription: Subscription | null = null
  reviewSubscription: Subscription | null = null
  subscription1: Subscription | null = null;
  constructor(private backend: NovelishBackendService, private OLService: OpenLibraryService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
    // this.OLSubscription = this.activatedRoute.paramMap
		// 	.pipe(switchMap(p => this.OLService.getBook(p.get('ibsn'))))
		// 	.subscribe((book) => {
    //     console.log(book)
    //     this.book = book});
    // console.log(this.book)

    this.activatedRoute.paramMap.subscribe(params => {
      this.isbn = params.get('isbn')
    })

    this.OLSubscription = this.OLService.getBook(this.isbn)
    .subscribe((book) => {
      console.log(book)
      this.book = book[`ISBN:${this.isbn}`]});
  
    this.reviewSubscription = this.backend.getReviewsByBook(this.isbn).subscribe((reviews)=>{
      this.reviews = reviews
    })
  
  }
  reviewIt() {

  }

  addToShelf() {
    // this.subscription1 = this.backend.addBookToShelf(this.isbn, this.shelf)
  }

  addToBurnShelf() {

  }

}
