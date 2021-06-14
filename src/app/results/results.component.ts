import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OpenLibraryService } from '../open-library.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  subscription: Subscription | null = null
  constructor(private OLService: OpenLibraryService) { }

  resultList: any  = null
  result:any 
  ngOnInit(): void {
    console.log('In Init')
   this.subscription = this.OLService.subject.subscribe((s) =>{
     console.log(s)
    this.resultList = s
   })
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }}

}
