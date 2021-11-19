export interface ITokenManager {
  validate(decoded: any, isUserWeb?: boolean): Promise<any>;
}
