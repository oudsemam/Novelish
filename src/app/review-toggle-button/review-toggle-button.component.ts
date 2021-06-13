import { Component, OnInit } from '@angular/core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ReviewCat } from '../review-cat';

@Component({
  selector: 'app-review-toggle-button',
  templateUrl: './review-toggle-button.component.html',
  styleUrls: ['./review-toggle-button.component.css'],
})
export class ReviewToggleButtonComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  proCategories: ReviewCat[] = [];
  conCategories: ReviewCat[] = [];

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
    },
  ];

  constructor() {}

  ngOnInit(): void {}
  togglePossitive(item: ReviewCat, i: number) {
    if (
      this.proCategories.some(
        (proCategories) => proCategories.reviewCategory === item.reviewCategory
      )
    ) {
      this.proCategories.splice(i, 1);
    } else {
      this.proCategories.push(item);
    }
  }

  toggleNegative(item: ReviewCat, i: number) {
    if (
      this.conCategories.some(
        (conCategories) => conCategories.reviewCategory === item.reviewCategory
      )
    ) {
      this.conCategories.splice(i, 1);
    } else {
      this.conCategories.push(item);
    }
  }

  isSelectedPossitive(item: ReviewCat) {
    return this.proCategories.some(
      (proCategories) => proCategories.reviewCategory === item.reviewCategory
    );
  }

  isSelectedNegative(item: ReviewCat) {
    return this.conCategories.some(
      (conCategories) => conCategories.reviewCategory === item.reviewCategory
    );
  }
}
