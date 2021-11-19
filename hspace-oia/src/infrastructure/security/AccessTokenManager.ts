import * as jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";


export default class AccessTokenManager {
  generate(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      algorithm: "HS256",
    });
  }

  generateLicense(accountId: number, api: string, method: string, objectId: number): string {
    const exp = Number(process.env.LICENCE_EXPIRE);

    return jwt.sign({
      "jti": uuid(),
      "sub": accountId,
      "exp": Math.floor(Date.now() / 1000) + exp,
      "custom:api": api,
      "custom:method": method,
      "custom:id": objectId,
    }, process.env.LICENCE_SECRET_KEY, {
      algorithm: "HS256",
    });
  }

  decode(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
  }

  decodeLicense(token: string): any {
    return jwt.verify(token, process.env.LICENCE_SECRET_KEY, {
      algorithms: ["HS256"],
    });
  }
}
