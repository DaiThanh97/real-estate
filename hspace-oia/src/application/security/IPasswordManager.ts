export interface IPasswordManager {
  hashPassword(password: string): any;

  checkPassword(password: string, hashPassword: string): any;

  generate(): string;
}
