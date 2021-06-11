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

  resultList: [] | null = null
  result:any = null
  ngOnInit(): void {
    this.resultList = this.OLService.getResults()
    this.subscription = this.OLService.getSubject().subscribe((subject)=>{
      if(subject){
        this.resultList = subject;
      } else { this.resultList = []}
    })
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }}

}
