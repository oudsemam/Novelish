import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {

  constructor(private http: HttpClient) { }

  searchTitle(searchTerm:string, type:string): Observable<any>{

    //Searches based on title
    // if (type == "title"){
      let title = searchTerm.replace(/\s/g,'+')
      return this.http.get(`http://openlibrary.org/search.json?title=${title}`)
    // }
  }
}
