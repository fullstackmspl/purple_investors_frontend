import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  root =  environment.apiUrls.master
  userResponse: any;
  constructor(private http: HttpClient) { }

// ----------------------- Add New User ---------------------------------------------------
  addUser(data: any): Observable<any> {
    const subject = new Subject<any>();
    this.http.post(`${this.root}/user/signup`, data).subscribe(res => {
        this.userResponse = res;
        subject.next(this.userResponse);
    }, error => {
        subject.next(error.error);
    });
    return subject.asObservable();
}
// ----------------------- Login User ---------------------------------------------------
loginUser(data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.post(`${this.root}/user/login`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Add Bundle ---------------------------------------------------
addBundle(data: any): Observable<any> {
  const subject = new Subject<any>();
  this.http.post(`${this.root}/bundle/create`, data).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
// ----------------------- Get Bundles List ---------------------------------------------------
// getAllBundle(id): Observable<any> {
//   const subject = new Subject<any>();
//   this.http.get(`${this.root}/chatgpt/search?bundle_id=${bundle_id}&user_id=${user_id}&search=${search}'`,).subscribe(res => {
//       this.userResponse = res;
//       subject.next(this.userResponse);
//   }, error => {
//       subject.next(error.error);
//   });
//   return subject.asObservable();
// }
// ----------------------- Search Chatgpt ---------------------------------------------------
chatgptSearch(bundle_id: any,user_id:any,search:any): Observable<any> {
  const subject = new Subject<any>();
  this.http.get(`${this.root}/chatgpt/search?bundle_id=${bundle_id}&user_id=${user_id}&search_value=${search}'`,).subscribe(res => {
      this.userResponse = res;
      subject.next(this.userResponse);
  }, error => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
}
