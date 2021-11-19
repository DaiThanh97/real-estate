import { BaseSerializer } from "./Base";
import { Expose } from "class-transformer";


export class MessageSerializer extends BaseSerializer {
  @Expose()
  content: string;

  @Expose()
  status: string;

  @Expose()
  conversationId: string;
}
