export class EmailUpdater{
  adminEmail: string;
  newAdminEmail: string;

  constructor( adminEmail: string, newAdminEmail: string)
  {
    this.adminEmail = adminEmail;
    this.newAdminEmail = newAdminEmail;
  }

  //get
  public getAdminEmail(): string { return this.adminEmail;}
  public getnewAdminEmail(): string { return this.newAdminEmail;}

  //set
  public setAdminEmail(adminEmail: string): void { this.adminEmail = adminEmail; }
  public setNewAdminEmail(newAdminEmail: string): void { this.newAdminEmail = newAdminEmail; }
}
