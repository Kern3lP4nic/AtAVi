import {Injectable} from '@angular/core';
import {Http, RequestMethod, RequestOptions, URLSearchParams, Headers} from '@angular/http';

@Injectable()
export class ManageFirmsService {

    private BASE_URL    = 'https://by8yv1gxqg.execute-api.us-east-1.amazonaws.com';
    private PATH        = '/Administration/ManageFirm';

    constructor(private http: Http) { }

    getFirms() {
        const headers = new Headers({
            'token': sessionStorage.getItem('token')
        });
        const options = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers
        });
        return this.http.get(this.BASE_URL + this.PATH + '/Firm', options);
    }

    /*updateFirm() {
        const headers = new Headers({

        });
        const options = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: ''
        });
        return this.http.get(this.BASE_URL + this.PATH, options);
    }*/

    getConversation(firm: string, guest: string) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('firm', firm);
        params.set('guest', guest);

        const headers = new Headers({
            'token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: params
        });
        return this.http.get(this.BASE_URL + this.PATH + '/Conversation', options);
    }
}
