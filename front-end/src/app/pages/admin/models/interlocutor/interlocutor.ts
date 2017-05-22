export class Interlocutor {

    private id_slack: string;
    private name: string;
    private isDefault: boolean;

    constructor(id_slack, name, isDefault) {
        this.id_slack = id_slack;
        this.name = name;
        this.isDefault = isDefault;
    }

    getId_slack(): string {
        return this.id_slack;
    }

    setId_slack(value: string) {
        this.id_slack = value;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string) {
        this.name = value;
    }

    getIsDefault(): boolean {
        return this.isDefault;
    }

    setIsDefault(value: boolean) {
        this.isDefault = value;
    }
}
