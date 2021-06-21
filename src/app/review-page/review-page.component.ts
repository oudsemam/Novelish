import { Component, OnInit } from '@angular/core';
import { faMinusCircle, faPlusCircle, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { OpenLibraryService } from '../open-library.service';
import { ReviewCat } from '../review-cat';

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
  faStar = faStar;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faStarHalfAlt = faStarHalfAlt;

  starRating = 0;

  reviewCategories: ReviewCat[] = [
    {
      reviewCategory: 'Accuracy',
      value: null,
    },
    {
      reviewCategory: 'Character Development',
      value: null,
    },
    {
      reviewCategory: 'Editing',
      value: null,
    },
    {
      reviewCategory: 'Informative',
      value: null,
    },
    {
      reviewCategory: 'Organization',
      value: null,
    },
    {
      reviewCategory: 'Pacing',
      value: null,
    },
    {
      reviewCategory: 'Plot Development',
      value: null,
    },
    {
      reviewCategory: 'Readability',
      value: null,
    },
    {
      reviewCategory: 'World-Building',
      value: null,
    },
    {
      reviewCategory: 'Worth the Time/Cost',
      value: null,
    },
    {
      reviewCategory: 'Writing Style',
      value: null,
    },
  ];

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
