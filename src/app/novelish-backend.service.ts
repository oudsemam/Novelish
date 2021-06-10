import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NovelishBackendService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(`http://localhost:3000/users`)
  }

  getAllBooks():Observable<any>{
    return this.http.get(`http://localhost:3000/books`)
  }

  getAllShelves():Observable<any>{
    return this.http.get(`http://localhost:3000/shelves`)
  }

  getShelvesByUser(userId:number):Observable<any>{
    return this.http.get(`http://localhost:3000/shelves/${userId}`)
  }

  getBooksFromShelf(shelf:string, userId:number):Observable<any>{
    return this.http.get(`http://localhost:3000/shelves/${shelf}/${userId}`)
  }

  getAllNotes(userId:number):Observable<any>{
    return this.http.get(`http://localhost:3000/notes/${userId}`)
  }

  getNotesByBook(userId:number, bookId:number):Observable<any>{
    return this.http.get(`http://localhost:3000/notes/${userId}/${bookId}`)
  }
//HOw to declare body??
  addNote(userId:number, bookId:number):void{
     this.http.get(`http://localhost:3000/notes/${userId}/${bookId}`)
}

  deleteNote(userId:number, bookId:number):void{
    this.http.delete(`http://localhost:3000/notes/${userId}/${bookId}`)
  }

  deleteShelf(userId:number, shelf:string):void{
    this.http.delete(`http://localhost:3000/shelves/${shelf}/${userId}`)
  }

  removeBookFromShelf(shelf:string, userId:number, bookId:number){
    this.http.delete(`http://localhost:3000/books/${shelf}/${userId}/${bookId}`)
  }

  removeUser(userId:number):void{
    this.http.delete(`http://localhost:3000/users/${userId}`)
  }
}
