import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {

  constructor(private http: HttpClient) { }

  searchTitle(searchTerm:string): Observable<any>{

      let title = searchTerm.replace(/\s/g,'+')
      return this.http.get(`http://openlibrary.org/search.json?title=${title}`)
  }

  searchAuthor(searchTerm:string): Observable<any>{
    let author = searchTerm.replace(/\s/g,'+')
    return this.http.get(`http://openlibrary.org/search.json?author=${author}`)
  }

  getCover(isbn:string): Observable<any>{
    return this.http.get(`http://covers.openlibrary.org/b/isbn/${isbn}-m.jpg`)
  }

  getBook(isbn:string): Observable<any>{
    return this.http.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
  }
}
