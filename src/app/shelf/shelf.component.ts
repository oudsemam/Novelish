import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { Shelf } from '../shelf';
import { ShelvesService } from '../shelves.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  shelfList: any = [];
  
  book: Observable<any> | any | null = null;

  @Input() books: Book[] = [];

  @Input() shelf: Shelf | null = null;


  constructor(private shelvesService: ShelvesService) { }
  

  ngOnInit(): void {
    this.shelfList = this.shelvesService.shelves
  }

}
