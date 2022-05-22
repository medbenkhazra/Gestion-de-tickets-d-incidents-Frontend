import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';


const API_URL = 'http://localhost:8036/api/test/';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: User;
    private _comptablesValidateur: Array<User>;
    private _users: Array<User>;


    get comptablesValidateur(): Array<User> {
        if (this._comptablesValidateur == null) {
            this._comptablesValidateur = new Array<User>();
        }
        return this._comptablesValidateur;
    }

    set comptablesValidateur(value: Array<User>) {
        this._comptablesValidateur = value;
    }

    get users(): Array<User> {
        if (this._users == null) {
            this._users = new Array<User>();
        }
        return this._users;
    }

    set users(value: Array<User>) {
        this._users = value;
    }

    get user(): User {
        if (this._user == null) {
            this._user = new User();
        }
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    constructor(private http: HttpClient) {
    }

    getUsersSociete(): Observable<any> {
        return this.http.get<Array<User>>(API_URL);
    }


    getUsersComptable(): Observable<any> {
        return this.http.get<Array<any>>(API_URL);
    }

    getPublicContent(): Observable<any> {
        return this.http.get(API_URL + 'all', {responseType: 'text'});
    }

    getUserBoard(): Observable<any> {
        return this.http.get(API_URL + 'user', {responseType: 'text'});
    }

    getModeratorBoard(): Observable<any> {
        return this.http.get(API_URL + 'mod', {responseType: 'text'});
    }

    getAdminBoard(): Observable<any> {
        return this.http.get(API_URL + 'admin', {responseType: 'text'});
    }
}
