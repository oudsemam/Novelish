import { Component, OnInit } from '@angular/core';
import { Shelf } from "src/app/shelf";
import { Book } from '../book';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  constructor() { }

  shelves: Shelf[] = [
    {shelfName: "Have Read",},
    {shelfName: "Want to Read",},
    {shelfName: "Burn It!",},
    {shelfName: "Did Not Finish"},
    {shelfName: "Currently Reading"}
  ];
  
  books: Book[] = [
    {title: "The Hobbit", author: "J.R.R. Tokien", genre: "Fantasy", isbn: 12345678910, progress: 80, cover: "../../assets/thehobbit.jpg" },
    {title: "Patrick", author: "Stephen Lawhead", genre: "Historical Fiction", isbn: 12345678654, progress: 100, cover: "../../assets/Patrick.jpg"},
    {title: "The Lord of the Rings", author: "J.R.R. Tokien", genre: "Fantasy", isbn: 1234567891012, progress: 60, cover: "../../assets/LOTR.gif"},
    {title: "Byzantium", author: "Stephen Lawhead", genre: "Historical Fiction", isbn: 12345678910145, progress: 100, cover: "../../assets/byzantium.jpg"}
  ]

  ngOnInit(): void {
    this.shelves = this.shelves
    this.books = this.books
  }

}
