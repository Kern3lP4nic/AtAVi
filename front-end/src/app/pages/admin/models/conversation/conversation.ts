import {Log} from './log';

export class Conversation {

    private id_session: Number;
    private firm_name: string;
    private guest_name: string;
    private logs: Array<Log> = new Array<Log>();

    constructor(id_session, firmName: string, guestName: string, logs: Array<Log>) {
        this.id_session = id_session;
        this.firm_name  = firmName;
        this.guest_name = guestName;
        this.logs = logs;
    }

    getSessionId(): Number {
        return this.id_session;
    }

    getFirmName(): string {
      return this.firm_name;
    }

    getGuestName(): string {
      return this.guest_name;
    }

    getLogs(): Array<Log> {
        return this.logs;
    }
}
