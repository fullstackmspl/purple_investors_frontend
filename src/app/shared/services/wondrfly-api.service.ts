import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WondrflyApiService {
  root = environment.apiUrls.wondrfly
  constructor(private http: HttpClient) { }
  getCategory(query): Observable<any[]> {
    const subject = new Subject<any[]>();
    this.http.get(`${this.root}/categories/list?isActivated=${query}`,).subscribe((responseData: any) => {
      subject.next(responseData.data);
    }, (error) => {
      subject.next(error.error);
    });
    return subject.asObservable();
  }
  getTags(): Observable<any[]> {
    const subject = new Subject<any[]>();
    this.http.get(`${this.root}/tags/list`).subscribe((responseData:any) => {
      subject.next(responseData.data);
    }, (error) => {
      subject.next(error.error);
    });
    return subject.asObservable();
  }
}
