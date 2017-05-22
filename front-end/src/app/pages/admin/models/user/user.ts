export class User {

  private email: string;
  private password: string;
  private newpassword: string;
  private confirmpassword: string;

  constructor(email: string, password: string, newpassword: string, confirmpassword: string) {
    this.email = email;
    this.password = password;
    this.newpassword = newpassword;
    this.confirmpassword = confirmpassword;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getNewPassword(): string {
    return this.newpassword;
  }

  public getConfirmPassword(): string {
    return this.confirmpassword;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setNewPassword(newpassword: string): void {
    this.newpassword = newpassword;
  }

  public setConfirmPassword(confirmpassword: string): void {
    this.confirmpassword = confirmpassword;
  }
}
