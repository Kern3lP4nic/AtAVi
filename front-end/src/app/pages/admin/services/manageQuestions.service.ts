import {Injectable} from '@angular/core';
import {Http, RequestMethod, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import {Answer} from '../models/question/answer';
import {Action} from '../models/question/action';

@Injectable()
export class ManageQuestionsService {

  private BASE_URL    = 'https://by8yv1gxqg.execute-api.us-east-1.amazonaws.com';
  private PATH        = '/Administration/ManageQuestions';

    constructor(private http: Http) { }

  getActions() {
    const headers = new Headers({
      'token': sessionStorage.getItem('token')
    });
    const options = new RequestOptions({
      method: RequestMethod.Get,
      headers: headers
    });
    return this.http.get(this.BASE_URL + this.PATH + '/Actions', options);
  }

  getQuestions() {
    const headers = new Headers({
      'token': sessionStorage.getItem('token')
    });
    const options = new RequestOptions({
      method: RequestMethod.Get,
      headers: headers
    });
    return this.http.get(this.BASE_URL + this.PATH + '/Questions', options);
  }

  addQuestion(id: Number, text: string, recurrentText: string, dynamic: boolean, isFirst: boolean, action: Number, answers: Array<Answer>) {
    const headers = new Headers({
      'token': sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers,
      body: {
        'id': id,
        'baseText': text,
        'recurrentText': recurrentText,
        'dynamic': dynamic,
        'isFirst': isFirst,
        'questionAction': action,
        'answers': answers
      }
    });
    return this.http.get(this.BASE_URL + this.PATH + '/Questions', options);
  }

  updateQuestion(id: Number, text: string, recurrentText: string, dynamic: boolean, isFirst: boolean, action: Number, answers: Array<Answer>) {
    const headers = new Headers({
      'token': sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      body: {
        'id': id,
        'baseText': text,
        'recurrentText': recurrentText,
        'dynamic': dynamic,
        'isFirst': isFirst,
        'questionAction': action,
        'answers': answers
      }
    });
    return this.http.get(this.BASE_URL + this.PATH + '/Questions', options);
  }

  deleteQuestion(id: any, text: string, recurrentText: string, dynamic: boolean, isFirst: boolean, action: Number, answers: Array<Answer>) {

    const headers = new Headers({
      'token': sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      method: RequestMethod.Delete,
      headers: headers,
      body: {
        'id': id,
        'baseText': text,
        'recurrentText': recurrentText,
        'dynamic': dynamic,
        'isFirst': isFirst,
        'questionAction': action,
        'answers': answers
      }
    });
    return this.http.get(this.BASE_URL + this.PATH + '/Questions', options);
  }

}
