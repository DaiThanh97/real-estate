export interface AccessTokenManager {
  generate(payload: any): string;

  decode(token: string): any;

  generateLicense(accountId: number, api: string, method: string, objectId: number): string;

  decodeLicense(token: string): any;
}
