import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../model/user.model";

const AUTH_API = 'http://localhost:8036/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user:User;


  get user(): User {
    if (this._user==null){
      this._user=new User();
    }
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    console.log(user);
    return this.http.post(AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    }, httpOptions);
  }

  register(): Observable<any> {
    return this.http.post(AUTH_API + 'signup', this.user, httpOptions);
  }
}
