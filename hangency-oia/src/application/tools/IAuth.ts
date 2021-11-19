export type JwtDecoded = {
  id: string;
  email: string;
};
export interface IAuth {
  decode(token: string): Promise<JwtDecoded>;
  getUserByEmail(email: string): Promise<{ uid: string; email?: string } | void>;
  createUser(email: string, password: string): Promise<{ uid: string; email?: string }>;
}
