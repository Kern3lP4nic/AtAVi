export class Admin {

    private email: string;
    private username: string;
    private password: string;
    private superadmin: boolean;

    constructor(email: string, username: string, password?: string, superadmin?: boolean) {
        this.email = email;
        this.username = username;
        if (password) this.password = password;
        if (superadmin) this.superadmin = superadmin;
    }

    getEmail() {
        return this.email;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    getSuperadmin() {
        return this.superadmin;
    }

    setEmail(email: string){
        this.email = email;
    }

    setUsername(username: string) {
        this.username = username;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setSuperadmin(superadmin: boolean) {
        this.superadmin = superadmin;
    }
}
