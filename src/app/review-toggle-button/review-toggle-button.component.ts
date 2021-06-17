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
  toggle = true;
  status = 'Enable';

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
 

  togglePositive(item: ReviewCat, i: number) {
    const foundItem = this.proCategories.findIndex(
      (thing) => thing.reviewCategory === item.reviewCategory
    );
    if (foundItem >= 0) {
      this.proCategories.splice(foundItem, 1);
    } else {
      this.proCategories.push(item);
      const foundThing = this.conCategories.findIndex(
        (thing) => thing.reviewCategory === item.reviewCategory
      );
      if(foundThing >= 0){
        this.conCategories.splice(foundThing, 1)
      }
    }
  }

  toggleNegative(item: ReviewCat, i: number) {
    const foundItem = this.conCategories.findIndex(thing => thing.reviewCategory=== item.reviewCategory)
    if (foundItem >= 0) {
      this.conCategories.splice(foundItem, 1);
    } else {
      this.conCategories.push(item);
      const foundThing = this.proCategories.findIndex(
        (thing) => thing.reviewCategory === item.reviewCategory
      );
      if (foundThing >= 0) {
        this.proCategories.splice(foundThing, 1);
      }
    }
  }

  isPositive(searchItem: string): boolean {
    const findProCategory = this.proCategories.find(
      (item) => searchItem === item.reviewCategory
    );
    return findProCategory ? true : false;
  }

  isNegative(searchItem: string): boolean {
    const findConCategory = this.conCategories.find(
      (item) => searchItem === item.reviewCategory
    );
    return findConCategory ? true : false;
  }
}
