import { Expose, Type } from "class-transformer";
import { BasicAccountSerializer } from "./Base";

export class ChatSocketSerializer {
  @Expose()
  id: number;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Expose({ groups: ["create"] })
  accountId: number;

  @Expose({ groups: ["create"] })
  identityName: string;

  @Expose({ groups: ["create"] })
  socketId: string;

  @Expose({ groups: ["create"] })
  sessionId: number;

  @Expose()
  @Type(() => BasicAccountSerializer)
  account: BasicAccountSerializer;
}
