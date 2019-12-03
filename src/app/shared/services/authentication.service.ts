import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserAuth } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    // private currentUserSubject: BehaviorSubject<UserAuth>;
    // public currentUser: Observable<UserAuth>;

    constructor(private http: HttpClient) {
      // this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('currentUser')));
      // this.currentUser = this.currentUserSubject.asObservable();
      // this.currentUserSubject.subscribe(data => {
      //   console.log(data);
      // })
    }

    public get currentUserValue(): UserAuth {
      // return this.currentUserSubject.value;
      return JSON.parse(localStorage.getItem('currentUser'));
    }

    login(email: string, password: string) {
      return this.http.post<any>(`${environment.apiURL}/users/login`, { email, password })
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user.Data && user.Data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.Data));
            // this.currentUserSubject.next(user.Data);
          }

          return user;
        }));
    }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      // this.currentUserSubject.next(null);
    }
}
