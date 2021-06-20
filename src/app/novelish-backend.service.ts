import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NovelishBackendService {
  constructor(private http: HttpClient) {}
  getHeaders(){
    const userString = localStorage.getItem('user')
    if(!userString){
      return new HttpHeaders()
    }
    const user = JSON.parse(userString)
    console.log(user)
    const header = new HttpHeaders().set('Authorization', `Bearer ${user.stsTokenManager.accessToken}`)
    return header
  }
  addNewUser() {
    return this.http.post('http://localhost:3000/users', {});
  }

  updateUserUID(email: any, uid: any) {
    let firebase_uid: Object = {
      firebase_uid: uid,
    };
    console.log(this.getHeaders())
    return this.http.post(`http://localhost:3000/users`, firebase_uid, {headers: this.getHeaders()});
  }

  getAllBooks(): Observable<any> {
    return this.http.get(`http://localhost:3000/books`, {headers: this.getHeaders()});
  }


  getShelvesByUser(): Observable<any> {
    return this.http.get(`http://localhost:3000/shelves`, {headers: this.getHeaders()});
  }

  getBooksFromShelf(shelf: string): Observable<any> {
    return this.http.get(`http://localhost:3000/shelves/${shelf}`,{headers: this.getHeaders()});
  }

  getAllNotes(): Observable<any> {
    return this.http.get(`http://localhost:3000/notes`, {headers: this.getHeaders()});
  }

  getNotesByBook(bookId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/notes/${bookId}`, {headers: this.getHeaders()});
  }

  addNote( bookId: number, note: string): Observable<any> {
    return this.http.post(`http://localhost:3000/notes/${bookId}`, {
      note,
    }, {headers: this.getHeaders()});
  }

  changeNote(userId: number, bookId: number, note: string): Observable<any> {
    return this.http.put(`http://localhost:3000/notes/${userId}/${bookId}`, {
      note,
    }, {headers: this.getHeaders()});
  }

  addUser(email: string): Observable<any> {
    return this.http.post(`http://localhost:3000/users`, { email }, {headers: this.getHeaders()});
  }

  addBookToShelf(book: {}, shelf: string): Observable<any> {
    return this.http.post(
      `http://localhost:3000/shelves/${shelf}/books`,
      book, {headers: this.getHeaders()}
    );
  }

  deleteNote( bookId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/notes/${bookId}`, {headers: this.getHeaders()});
  }

  deleteShelf( shelf: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/shelves/${shelf}`, {headers: this.getHeaders()});
  }

  removeBookFromShelf(
    shelf: string,
    bookId: number
  ): Observable<any> {
    return this.http.delete(
      `http://localhost:3000/books/${shelf}/${bookId}`, {headers: this.getHeaders()}
    );
  }

  removeUser(): Observable<any> {
    return this.http.delete(`http://localhost:3000/users`, {headers: this.getHeaders()});
  }

  getReviewsByBook(isbn:string): Observable<any>{
    return this.http.get(`http://localhost:3000/reviews/${isbn}`, {headers: this.getHeaders()})
  }

  getUserReview(isbn:string): Observable<any>{
    return this.http.get(`http://localhost:3000/reviews/user/${isbn}`, {headers: this.getHeaders()})
  }

  addReview(review:any, isbn:string): Observable<any>{
    return this.http.post(`http://localhost:3000/reviews/${isbn}`, {
      review,
    }, {headers: this.getHeaders()})
  }

  updateReview(review:any, isbn:string): Observable<any>{
    return this.http.put(`http://lovalhost:3000/${isbn}`, {
      review,
    }, {headers: this.getHeaders()})
  }

  removeReview(isbn:string):Observable<any>{
    return this.http.put(`http://lovalhost:3000/${isbn}`, {headers: this.getHeaders()})}
  
}
