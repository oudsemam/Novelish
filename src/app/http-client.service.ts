// import { HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpClientService {

//   constructor(private http: HttpHeaders) {}

//   createAuthorizationHeader(headers: Headers) {
//     headers.append('Authorization', 'Basic ' +
//       btoa('username:password')); 
//   }

//   get(url:any) {
//     let headers = new Headers();
//     this.createAuthorizationHeader(headers);
//     return this.http.get(url, {
//       headers: headers
//     });
//   }

//   post(url:any, data:any) {
//     let headers = new Headers();
//     this.createAuthorizationHeader(headers);
//     return this.http.set(url, data, {
//       headers: headers
//     });
//   }
// }
// }
