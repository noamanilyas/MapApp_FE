import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from './CSVModel';
import { environment } from '../../../environments/environment';

@Injectable()
export class UMPService {
  title = 'app';

  constructor(public http: HttpClient) {}

  getUsersData(): any {
    return this.http.get(`${environment.apiURL}/admin/getUsersData`);
  }

  changeUserAccess(id, isActive): any {
    return this.http.post(`${environment.apiURL}/admin/changeUserAccess`, { id: id, isActive: isActive });
  }
}
