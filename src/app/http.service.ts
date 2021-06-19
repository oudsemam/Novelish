import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';


@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  createAuthorizationHeader (headers: Headers) {
    headers.append('Authorization', 'Basic' + 
    btoa('username:password'));
  }

  get(url: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url: any, data: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
}}
