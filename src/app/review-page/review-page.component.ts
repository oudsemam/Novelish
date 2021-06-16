import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OpenLibraryService } from '../open-library.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
})
export class ReviewPageComponent implements OnInit {
  subscription: Subscription | null = null;
  constructor(private OLService: OpenLibraryService) {}

  reviewBookList: any = null;
  reviewResult: any;
  ngOnInit(): void {
    console.log('In Init');
    this.subscription = this.OLService.subject.subscribe((s) => {
      console.log(s);
      this.reviewBookList = s;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
  }
}
