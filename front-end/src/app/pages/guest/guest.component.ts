import {Component, OnInit} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {AmazonService} from './services/amazon.service';
import {AmazonCredentials} from './models/amazonCredentials.model';
import {AVSService} from './services/avs.service';

@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.css'],
    providers: [AVSService, AmazonService, AmazonCredentials]
})
export class GuestComponent implements OnInit {

    private userText: string;
    private loggedWithAmazon = false;

    constructor(private amazonService: AmazonService, private amazonCredentials: AmazonCredentials, private avsService: AVSService) {
        localStorage.setItem('messageId', String((new Date()).getTime()));
    }

    ngOnInit() {
        const params = new URLSearchParams(new URL(window.location.href).search);

        if (params.get('?code') !== null) {
            this.amazonCredentials.setCode(params.get('?code'));
            this.amazonService.getToken().subscribe(res => {
                res = res.json();
                console.log(res);
                this.loggedWithAmazon = true;
                this.amazonCredentials.setAccessToken(res['access_token']);
                this.amazonCredentials.setRefreshToken(res['refresh_token']);
                this.establishDownchannel();
                window.history.pushState({'pageTitle': document.title}, document.title, location.origin + '/guest');
            });
        } else if (this.amazonCredentials.getRefreshToken() !== null) {
            this.amazonService.refreshToken().subscribe(res => {
                res = res.json();
                console.log(res);
                this.loggedWithAmazon = true;
                this.amazonCredentials.setAccessToken(res['access_token']);
                this.amazonCredentials.setRefreshToken(res['refresh_token']);
                this.establishDownchannel();
            }, err => {
                err = err.json();
                console.log(err);
                this.loggedWithAmazon = false;
            });
        } else {
            this.amazonService.getCode().subscribe(res => {
                window.location.href = res.url;
            }, err => {
                err = err.json();
                console.log(err);
            });
        }
    }

    establishDownchannel() {
        this.avsService.establishDownchannel().subscribe(res => {
            console.log('Downchannel response: ' + res);
        }, err => {
            err = err.json();
            console.log(err);
        });

        setInterval(this.ping(), 300000);
        this.synchronizeState();
    }

    ping() {
        this.avsService.postPing().subscribe(res => {
            console.log('Ping response: ' + res);
        }, err => {
            err = err.json();
            console.log(err);
        });
    }

    synchronizeState() {
        this.avsService.synchronizeState().subscribe(res => {
            console.log('Events response: ' + res);
        }, err => {
            err = err.json();
            console.log(err);
        });
    }

    speechRecognizer(audio: string) {
        this.avsService.speechRecognizer(audio).subscribe(res => {
            console.log('Events response: ' + res);
        }, err => {
            err = err.json();
            console.log(err);
        });
    }

    loginWithAmazon() {
        this.amazonService.getCode().subscribe(res => {
            window.location.href = res.url;
        }, err => {
            err = err.json();
            console.log(err);
        });
    }

    refreshToken() {
        this.amazonService.refreshToken().subscribe(res => {
            res = res.json();
            console.log(res);
            this.loggedWithAmazon = true;
            this.amazonCredentials.setAccessToken(res['access_token']);
            this.amazonCredentials.setRefreshToken(res['refresh_token']);
        }, err => {
            err = err.json();
            console.log(err);
            this.loggedWithAmazon = false;
        });
    }

    audioReceived(data) {
        data = data.split('data')[1];
        console.log(data);

        this.speechRecognizer(data);
    }

    updateDataDisplay(data) {
        this.userText = data.text;
    }
}
