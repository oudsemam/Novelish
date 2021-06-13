import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../book';
import { NovelishBackendService } from '../novelish-backend.service';
import { Shelf } from '../shelf';
import { ShelvesService } from '../shelves.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  
  
  book: Observable<any> | any | null = null;

  books: any[] = [];
  userId: number | null = null
  @Input() shelf: string = '';

  subscription: Subscription | null = null
  constructor(private NBService: NovelishBackendService) { }
  

  ngOnInit(): void {
    this.subscription = this.NBService.getBooksFromShelf(this.shelf, this.userId ).subscribe(b => {
      console.log(b);
      this.books = b
    })
  }

}
