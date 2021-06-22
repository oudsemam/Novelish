import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {
  resultList: [] = []
  subject = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  searchTitle(searchTerm:string): Observable<any>{

      let title = searchTerm.replace(/\s/g,'+')
      return this.http.get(`https://openlibrary.org/search.json?title=${title}`).pipe(map((results: any) => this.subject.next(results.docs.filter((d: any) => d.isbn!== undefined) )))
  }

  searchAuthor(searchTerm:string): Observable<any>{
    let author = searchTerm.replace(/\s/g,'+')
    return this.http.get(`https://openlibrary.org/search.json?author=${author}`).pipe(map((results) => this.subject.next(results) ))
  }

  getCover(isbn:string): Observable<any>{
    return this.http.get(`https://covers.openlibrary.org/b/isbn/${isbn}-m.jpg`)
  }

  getBook(isbn:string | null): Observable<any>{
    return this.http.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
  }

  sendResult(resultList: []){
    this.subject.next(resultList);
  }

  getSubject(){
    return this.subject.asObservable();
  }

  addResults(books: []){
    this.resultList = books;
  }

  getResults(){
    return this.resultList;
  }
}
