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
  user: any | null = null
  userId: number | null = null
  @Input() shelf: string = '';
  emailsubscription: Subscription | null = null
  subscription: Subscription | null = null
  constructor(private NBService: NovelishBackendService) { }
  

  ngOnInit(): void {
    console.log(this.shelf)
      this.subscription = this.NBService.getBooksFromShelf(this.shelf).subscribe(b => {
        console.log('in get books')
        console.log(b);
        this.books = b
      })
  }

}
