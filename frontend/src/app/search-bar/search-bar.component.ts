import { Component, OnInit, OnDestroy } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { OpenLibraryService } from '../open-library.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  faSearch = faSearch;
  searchTerm: string = '';
  subscription: Subscription | null = null;
  book: boolean = true
  author: boolean = false

  constructor(private OLService: OpenLibraryService, private router: Router) { }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  search(){
    if(this.book)
    {console.log("in title search")
      this.subscription = this.OLService.searchTitle(this.searchTerm)
    .subscribe(()=>{
      this.router.navigate(['/results'])
    })}
    // if(this.author)
    // {this.subscription = this.OLService.searchAuthor(this.searchTerm)
    //   .subscribe(()=>{})}
  }
}
