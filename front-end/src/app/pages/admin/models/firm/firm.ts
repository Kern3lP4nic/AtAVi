import {Guest} from '../guest/guest';

export class Firm {

    private name: string;
    private guestArray: Array<Guest> = new Array<Guest>();

    constructor(name: string, guestArray: Array<Guest>) {
        this.name = name;
        this.guestArray = guestArray;
    }

    getName() {
        return this.name;
    }

    setName(value: string) {
        this.name = value;
    }

    getGuests() {
        return this.guestArray;
    }
}
