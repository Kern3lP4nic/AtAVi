import {Component, OnInit} from '@angular/core';
import {Log} from '../../models/conversation/log';
import {Firm} from '../../models/firm/firm';
import {Guest} from '../../models/guest/guest';
import {ManageFirmsService} from '../../services/manageFirms.service';

@Component({
    selector: 'app-manage-firms',
    templateUrl: './manage-firms.component.html',
    styleUrls: ['./manage-firms.component.css'],
    providers: [ManageFirmsService]
})
export class ManageFirmsComponent implements OnInit {

    private firmArray: Array<Firm>              = new Array<Firm>();
    private guestArray: Array<Guest>            = new Array<Guest>();
    private logs: Array<Log>                    = new Array<Log>();
    private chat: Array<string|string>          = new Array<string|string>();

    constructor(private manage: ManageFirmsService) {
        this.getFirms();
    }

    ngOnInit() {
    }

    getFirms() {
        this.manage.getFirms().subscribe(res => {
            res = res.json();

            const item = (res['Object']);
            for (const firm of item) {
                this.guestArray = new Array<Guest>();
                for (const guest of firm.guests) {
                    let app = false;
                    // Check if the guest exists
                    for (const index of this.guestArray) {
                        if (index.getName() === guest.nameg) {
                            app = true;
                        }
                    }
                    if (!app) {
                        this.guestArray.push(new Guest(guest.nameg));
                    }
                }
                this.firmArray.push(new Firm(firm.name, this.guestArray));
            }
        }, err => {
            err = err.json();
            console.log(err);
        });
    }

    showGuests(event: Event) {
        this.logs = new Array<Log>();
    }

    showLogs(event: Event, firm: Firm, guest: Guest) {
        this.manage.getConversation(firm.getName(), guest.getName()).subscribe(res => {
            res = res.json();

            const item = res['Object'];
            for (const conv of item) {
                for (const log of conv.logg) {
                    // Check if answer exsists
                    if (log.answer) {
                        // Check if timestamp exsists
                        if (log.timestamp) {
                          this.logs.push(new Log(log.question.baseText, log.answer.text, log.timestamp));
                        }
                    }
                }
            }
            console.log(this.logs);
        }, err => {
            err = err.json();
            console.log(err);
        });
    }

    showConversation(event: Event, log: Log) {
        console.log(log);
        this.chat.push(log.getQuestion(), log.getAnswer());
    }
}
