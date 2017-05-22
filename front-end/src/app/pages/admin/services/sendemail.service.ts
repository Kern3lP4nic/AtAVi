import {Injectable} from '@angular/core';
import {Http, RequestMethod, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class SendEmailService {

  private BASE_URL    = 'https://by8yv1gxqg.execute-api.us-east-1.amazonaws.com';
  private PATH        = '/Administration/ManageAuth/SendEmail';

  constructor(private http: Http) { }

  sendEmail(username: string) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      method: RequestMethod.Get,
      headers: headers
    });
      return this.http.get(this.BASE_URL + this.PATH + '?username=' + username, options);

  }


  update(token: string, password: string) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      body: {
        'recoveryToken': token,
        'password': password
      }
    });
    return this.http.get(this.BASE_URL + this.PATH, options);
  }

}
