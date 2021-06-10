import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { OpenLibraryService } from '../open-library.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  faSearch = faSearch;
  searchTerm: string = '';
  subscription: Subscription | null = null;
  book: boolean = false
  author: boolean = false

  constructor(private OLService: OpenLibraryService) { }

  ngOnInit(): void {
  }

  search(){
    if(this.book)
    {this.subscription = this.OLService.searchTitle(this.searchTerm)
    .subscribe((Response) =>{
      let resultList = Response.docs;
      this.OLService.addResults(resultList);
      this.OLService.sendResult(resultList);
    })}
    if(this.author)
    {this.subscription = this.OLService.searchAuthor(this.searchTerm)
    .subscribe((Response) =>{
      let resultList = Response.docs;
      this.OLService.addResults(resultList);
      this.OLService.sendResult(resultList);
    })}
  }
}
