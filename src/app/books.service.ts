import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [
    {title: "The Hobbit", 
    author: "J.R.R. Tokien", 
    genre: "Fantasy", 
    isbn: 12345678910, 
    progress: 80, 
    cover: "../../assets/thehobbit.jpg",
    want: false,
    read: true,
    dnf: false,
    burn: false,
    current: false },

    {title: "Patrick", 
    author: "Stephen Lawhead", 
    genre: "Historical Fiction", 
    isbn: 12345678654, 
    progress: 100, 
    cover: "../../assets/Patrick.jpg",
    want: true,
    read: false,
    dnf: false,
    burn: false,
    current: false},

    {title: "The Lord of the Rings", 
    author: "J.R.R. Tokien", 
    genre: "Fantasy", 
    isbn: 1234567891012, 
    progress: 60, 
    cover: "../../assets/LOTR.gif",
    want: false,
    read: false,
    dnf: true,
    burn: false,
    current: false},
    
    {title: "Byzantium", 
    author: "Stephen Lawhead", 
    genre: "Historical Fiction", 
    isbn: 12345678910145, 
    progress: 100, 
    cover: "../../assets/byzantium.jpg",
    want: false,
    read: true,
    dnf: false,
    burn: false,
    current: false}
  ];
  
  constructor() { }

  getBooks() {
    
  }
}
