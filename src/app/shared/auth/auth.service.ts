import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { Role } from '../models/role.model';

@Injectable()
export class AuthService {
  root = environment.apiUrls.master;
  _user: any
  private _currentUserSubject: BehaviorSubject<User>;
  userChanges: Observable<User>;
  constructor(public router: Router,
    private http: HttpClient,
    private store: LocalStorageService
  ) {
    this._currentUserSubject = new BehaviorSubject<User>(this.store.getObject('user'));
    this.userChanges = this._currentUserSubject.asObservable();

  }
  setUser(user: any) {
    if (user) {
      this.store.setItem('user', JSON.stringify(user));
      this.store.setItem('token', user.token);
    } else {
      this.store.clear();
    }
    this._user = user;
    this._currentUserSubject.next(user);
  }

  public get userValue(): User {
    return this._currentUserSubject.value;
  }

  currentUser() {
    this._user = JSON.parse(this.store.getItem('user'));
    return this._user
  }
  signinUser(model): Observable<User> {
    
    const subject = new Subject<User>();
    this.http.post(`${this.root}/user/login`, model,).subscribe((responseData: any) => {
      if (responseData.statusCode !== 201) {
        throw new Error('This request has failed ' + responseData.status);
      }
      const dataModel = responseData
      if (!dataModel.isSuccess) {
        if (responseData.status === 201) {

          throw new Error(dataModel.code || dataModel.message || 'failed');
        } else {
          throw new Error(responseData.status + '');
        }
      }
      if(dataModel.isSuccess){
        this.setUser(dataModel.data)
        subject.next(dataModel);
      }
    },
      (error) => {
        subject.next(error.error);
      });
    return subject.asObservable();
  }

  logout() {
      this.setUser(null)
      this.store.clear()
      this.router.navigate(['/login']);
  }

  isAuthorized() {
    return !this._user;
  }
  hasRole(role: Role) {
    return this.isAuthorized() && this._user.roles === role;
  }

}
