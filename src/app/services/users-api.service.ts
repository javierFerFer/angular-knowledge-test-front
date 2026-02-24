import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SeniorityOptions } from '../pages/users/subpages/user-create/user-create.component';

export interface userModel {
  id?: number;
  name?: string;
  surname?: string;
  seniority?: SeniorityOptions;
  yearsOfExperience?: number;
  availability?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private httpClient = inject(HttpClient);
  private url = `${environment.baseUrl}${environment.basePort}`;

  getAllUsers(): Observable<userModel[]> {
    return this.httpClient.get(`${this.url}/users`) as Observable<userModel[]>;
  }

  findUserById(id: number) {
    return this.httpClient.get(`${this.url}/users/${id}`) as Observable<userModel>;
  }

  createNewUser(user: userModel) {
    return this.httpClient.post(`${this.url}/users`, { ...user }) as Observable<userModel>;
  }

  deleteUserById(id: number) {
    return this.httpClient.delete(`${this.url}/users/${id}`) as Observable<userModel>;
  }

  updateUser(userId: number, user: userModel) {
    return this.httpClient.put(`${this.url}/users/${userId}`, user) as Observable<userModel>;
  }
}
