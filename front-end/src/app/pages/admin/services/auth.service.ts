import {Injectable} from '@angular/core';
import {Http, RequestMethod, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class AuthService {

    private BASE_URL    = 'https://by8yv1gxqg.execute-api.us-east-1.amazonaws.com';
    private PATH        = '/Administration/ManageAuth/Authentication';

    constructor(private http: Http) { }

    login(username: string, password: string) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: {
                username: username,
                password: password
            }
        });
        return this.http.get(this.BASE_URL + this.PATH, options);
    }

    update(username: string, email: string, oldPassword?: string, password?: string) {
        const headers = new Headers({
            token: sessionStorage.getItem('token')
        });
        const options = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: {
                'username': username,
                'email': email,
                //'oldPassword': oldPassword,
                'password': password
            }
        });
        return this.http.get(this.BASE_URL + this.PATH, options);
    }

    logout() {
        const headers = new Headers({
            token: sessionStorage.getItem('token')
        });
        const options = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers
        });
        return this.http.get(this.BASE_URL + this.PATH, options);
    }

    checkToken() {
        const headers = new Headers({
            token: sessionStorage.getItem('token')
        });
        const options = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers
        });
        return this.http.get(this.BASE_URL + this.PATH, options);
    }
}
