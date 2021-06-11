import { Component, OnInit } from '@angular/core';
import { faMinusCircle, faPlusCircle,  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review-toggle-button',
  templateUrl: './review-toggle-button.component.html',
  styleUrls: ['./review-toggle-button.component.css']
})
export class ReviewToggleButtonComponent implements OnInit {
faPlusCircle = faPlusCircle;
faMinusCircle = faMinusCircle;


  constructor(
    public review:Array<string> = [
    {id: 1, text: 'Sentence 1'},
    {id: 2, text: 'Sentence 2'},
    {id: 3, text: 'Sentence 3'},
    {id: 4, text: 'Sentenc4 '},
];
  ) { }

  ngOnInit(): void {
  }

}
