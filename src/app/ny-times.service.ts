import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NyTimesService {

  constructor(private http: HttpClient) { }

  getList(listname:string): Observable<any> {
    let list = listname.replace(/\s/g,'-')
    return this.http.get(`https://api.nytimes.com/svc/books/v3/lists/current/${list}?api-key=2HQ1GkrWdYaq6CzEMgktkGYjAlqWQ5HC`)
  }
}
