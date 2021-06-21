import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book';
import { Shelf } from '../shelf';
import { BooksService } from '../books.service'
import { OpenLibraryService } from '../open-library.service';
import { NovelishBackendService } from '../novelish-backend.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookList: any = [];

  @Input() book: Book | null = null;
  

  constructor(private OLService: OpenLibraryService, private NBService: NovelishBackendService) { }
  
  

  ngOnInit(): void {
    
  }

}
