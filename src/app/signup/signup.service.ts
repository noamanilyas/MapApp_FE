import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

import { environment } from '../../environments/environment';

@Injectable()
export class SignupService {
  title = 'app';
  public records: any[] = []; 

  constructor(public http: HttpClient) {}

  registerUser(user: User) {
        return this.http.post(`${environment.apiURL}/users/register`, user);
    }
}