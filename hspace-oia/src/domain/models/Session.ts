import { Account } from "./Account";
import { v4 as uuid } from "uuid";

export class Session {
  public id?: number;
  public token: string;
  public account: Account;
  public isActive: boolean;

  constructor(account: Account) {
    this.token = uuid();
    this.account = account;
    this.isActive = true;
  }

  public generatePayload() {
    const jwtExp = Number(process.env.JWT_EXPIRE);
    return {
      "jti": uuid(),
      "sub": this.account.id,
      "exp": Math.floor(Date.now() / 1000) + jwtExp,
      "custom:session": this.id,
      "custom:type": this.account.type,
    };
  }

  public deactivate() {
    if (this.isActive) {
      this.isActive = false;
    }
  }
}
