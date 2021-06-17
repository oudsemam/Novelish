import { Component, OnInit } from '@angular/core';
import { faMinusCircle, faPlusCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { ReviewCat } from '../review-cat';

@Component({
  selector: 'app-review-toggle-button',
  templateUrl: './review-toggle-button.component.html',
  styleUrls: ['./review-toggle-button.component.css'],
})
export class ReviewToggleButtonComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faStar = faStar;

  proCategories: ReviewCat[] = [];
  conCategories: ReviewCat[] = [];

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

  constructor() {}

  ngOnInit(): void {}

  toggle(value: boolean | null, i: number) {
    if (this.reviewCategories[i].value !== value) {
      this.reviewCategories[i].value = value;
    } else {
      this.reviewCategories[i].value = null;
    }
  }

}
