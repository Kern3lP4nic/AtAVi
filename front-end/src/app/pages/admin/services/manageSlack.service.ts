import {Injectable} from '@angular/core';
import {Http, RequestOptions, RequestMethod, Headers} from '@angular/http';

@Injectable()
export class ManageSlackService {

    private BASE_URL = 'https://by8yv1gxqg.execute-api.us-east-1.amazonaws.com';
    private PATH = '/Administration/ManageSlack';

    constructor(private http: Http) {
    }

    getDefaultInterlocutors() {
        const headers = new Headers({
            'token': sessionStorage.getItem('token')
        });
        const options = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            body: ''
        });
        return this.http.get(this.BASE_URL + this.PATH + '/DefaultInterlocutors', options);
    }

    getInterlocutors() {
        const headers = new Headers({
            'token': sessionStorage.getItem('token')
        });
        const options = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers
        });
        return this.http.get(this.BASE_URL + this.PATH + '/Interlocutors', options);
    }

    setInterlocutorToDefault(id_slack: string, name: string) {
        const headers = new Headers({
            'token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: {
                'id_slack': id_slack,
                'isDefault': true,
                'nameI': name
            }
        });
        return this.http.get(this.BASE_URL + this.PATH + '/DefaultInterlocutors', options);
    }

    removeInterlocutorFromDefault(id_slack: string, name: string) {
        const headers = new Headers({
            'token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            body: {
                "id_slack": id_slack,
                "isDefault": false,
                "nameI": name
            }
        });
        return this.http.get(this.BASE_URL + this.PATH + '/DefaultInterlocutors', options);
    }

    updateInterlocutor() {  // refresh interlocutor
        const headers = new Headers({
            'token': sessionStorage.getItem('token')
        });
        const options = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers
        });
        return this.http.get(this.BASE_URL + this.PATH + '/Interlocutors', options);
    }
}