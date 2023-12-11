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


}
