import {Injectable} from '@angular/core';
import {Http, RequestMethod, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class ManageAdminsService {

    private BASE_URL    = 'https://by8yv1gxqg.execute-api.us-east-1.amazonaws.com';
    private PATH        = '/Administration/ManageAdministrators';

    constructor(private http: Http) { }

    getAdmins() {
        const headers = new Headers({
            'token': sessionStorage.getItem('token')
        });
        const options = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            body: ''
        });
        return this.http.get(this.BASE_URL + this.PATH, options);
    }

    addAdmin(email: string, username: string, password: string, superAdmin: boolean) {
        const headers = new Headers({
            'token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: {
                'email': email,
                'username': username,
                'password': password,
                'superadmin': superAdmin ? superAdmin : false
            }
        });
        return this.http.get(this.BASE_URL + this.PATH, options);
    }

    updateAdmin(email: string, username: string, password?: string) {
        const headers = new Headers({
            'token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: {
                'email': email,
                'username': username,
                'password': password ? password : null
            }
        });
        return this.http.get(this.BASE_URL + this.PATH, options);
    }

    deleteAdmin(email: string, username: string) {
        const headers = new Headers({
            'token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            body: {
                'email': email,
                'username': username
            }
        });
        return this.http.get(this.BASE_URL + this.PATH, options);
    }
}
