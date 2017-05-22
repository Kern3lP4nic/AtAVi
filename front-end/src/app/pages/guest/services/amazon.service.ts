import {Http, Headers, RequestOptions, RequestMethod} from "@angular/http";
import {Injectable} from "@angular/core";
import {AmazonCredentials} from "../models/amazonCredentials.model";

//declare var require: any;
//const CryptoJS = require("crypto-js");

@Injectable()
export class AmazonService {

    private BASE_URL    = 'https://kzc6ts5w59.execute-api.us-east-1.amazonaws.com';
    private CLIENT_ID   = 'amzn1.application-oa2-client.1b4d3df586e24fbf8a9085facee73fb2';
    private IAM_SECRET  = 'BGUAVv1WttnRXAreZ5QN5fqCrc0GDUgpncH5MC0T';
    private AWS_REGION  = 'us-east-1';
    private AWS_REQUEST = 'aws4_request';
    private SCOPE       = 'alexa:all';
    private SCOPE_DATA  = '{"alexa:all":{"productID":"AtAVi","productInstanceAttributes":{"deviceSerialNumber":"12345"}}}';
    private REDIRECT    = 'http://localhost:4200/guest';

    constructor(private http: Http, private amazonCredentials: AmazonCredentials) { }

    getCode() {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            method: RequestMethod.Get
        });
        const url = 'https://www.amazon.com/ap/oa?client_id=' + this.CLIENT_ID + '&scope=' + this.SCOPE + '&scope_data=' + this.SCOPE_DATA + '&response_type=code&redirect_uri=' + this.REDIRECT;
        return this.http.get(url, options);
    }

    getToken() {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            method: RequestMethod.Get
        });
        const url = this.BASE_URL + '/AmazonLogin/gettoken?code=' + this.amazonCredentials.getCode();
        return this.http.get(url, options);
    }

    refreshToken() {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            method: RequestMethod.Get
        });
        const url = this.BASE_URL + '/AmazonLogin/refreshtoken?token=' + this.amazonCredentials.getRefreshToken();
        return this.http.get(url, options);
    }
}