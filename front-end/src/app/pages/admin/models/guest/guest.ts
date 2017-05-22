export class Guest {

    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setName(value: string) {
        this.name = value;
    }
}
