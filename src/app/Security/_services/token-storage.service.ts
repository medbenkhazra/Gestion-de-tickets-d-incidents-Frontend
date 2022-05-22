import { Injectable } from '@angular/core';
import {Route, Router, RouterModule} from "@angular/router";
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router: Router, private http: HttpClient) { }

  signOut() {
    window.sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  public findUserByUsername(username:string):Observable<any>{
    console.log("haahuwa l username");
    console.log(username);
    return this.http.get('http://localhost:8036/api/test/username/'+username);
  }
}
