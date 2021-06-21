import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faMinusCircle,
  faPlusCircle,
  faStar,
  faChevronDown,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { NovelishBackendService } from '../novelish-backend.service';
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
  faChevronDown = faChevronDown;
  faCheck = faCheck;
  expandInstructions: boolean = false;
  expandRatingScale:boolean = false;
  @Input()book: any = null;


  proCategories: ReviewCat[] = [];
  conCategories: ReviewCat[] = [];
  newReview!: string;
  addedReviews: string[] = [];
  rating: number | null = null;
  reviewText: string = '';
  submitSubscribe: Subscription | null = null;
  reviewSubscribe: Subscription | null = null;

  @Input()isbn: string = '';

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

  starRating = 0;

  constructor(
    private NBService: NovelishBackendService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.book);
  }

  toggle(value: boolean | null, i: number) {
    if (this.reviewCategories[i].value !== value) {
      this.reviewCategories[i].value = value;
    } else {
      this.reviewCategories[i].value = null;
    }
  }

  submit() {
    // const review = {
    //   rating: this.rating,
    //   reviewText: this.reviewText,
    //   plot: this.reviewCategories[6].value,
    //   character: this.reviewCategories[1].value,
    //   world: this.reviewCategories[8].value,
    //   pacing: this.reviewCategories[5].value,
    //   writing: this.reviewCategories[10].value,
    //   readability: this.reviewCategories[7].value,
    //   worth: this.reviewCategories[9].value,
    //   editing: this.reviewCategories[2].value,
    //   accuracy: this.reviewCategories[0].value,
    //   informative: this.reviewCategories[3].value,
    //   organization: this.reviewCategories[4].value,
    // };
    // console.log(this.reviewText);

    const newReview = this.newReview;
   

    this.submitSubscribe = this.NBService.addReview(
      newReview, this.isbn).subscribe(() => {
      this.router.navigate([`/shelves`]);
    });

    console.log(newReview);
  };

}
