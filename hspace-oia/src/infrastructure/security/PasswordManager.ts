import { compare, genSalt, hash } from "bcrypt";
import { IPasswordManager } from "../../application/security/IPasswordManager";


export default class PasswordManager implements IPasswordManager{
  async hashPassword(password: string): Promise<any> {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  async checkPassword(password: string, hashPassword: string): Promise<any> {
    return await compare(password, hashPassword);
  }

  private randomString(length: number) {
    let result           = "";
    const characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generate(): string {
    return `${this.randomString(5)}${this.randomInteger(0, 9)}`;
  }
}
