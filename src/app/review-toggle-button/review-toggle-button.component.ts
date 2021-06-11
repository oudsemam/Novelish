import { Component, OnInit } from '@angular/core';
import { faMinusCircle, faPlusCircle,  } from '@fortawesome/free-solid-svg-icons';
import { ReviewCat } from '../review-cat';

@Component({
  selector: 'app-review-toggle-button',
  templateUrl: './review-toggle-button.component.html',
  styleUrls: ['./review-toggle-button.component.css'],
})
export class ReviewToggleButtonComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  reviewCategories: ReviewCat[] = [
      {
        reviewCategory: 'Accuracy',
      },
      {
        reviewCategory: 'Character Development',
      },
      {
        reviewCategory: 'Editing',
      },
      {
        reviewCategory: 'Informative',
      },
      {
        reviewCategory: 'Organization',
      },
      {
        reviewCategory: 'Pacing',
      },
      {
        reviewCategory: 'Plot Development',
      },
      {
        reviewCategory: 'Readability',
      },
      {
        reviewCategory: 'World-Building',
      },
      {
        reviewCategory: 'Worth the Time/Cost',
      },
      {
        reviewCategory: 'Writing Style',
      }
    ];

  constructor() {}

  ngOnInit(): void {
    
  }
}
