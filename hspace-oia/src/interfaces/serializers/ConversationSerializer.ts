import { BaseSerializer, BasicAccountSerializer } from "./Base";
import { Expose, Transform, Type } from "class-transformer";
import { MessageSerializer } from "./MessageSerializer";
import { PagingSerializer } from "./PagingSerializer";

export class QueryParticipantSerializer extends PagingSerializer {
  @Expose()
  @Transform(({ value }: any) => {
    if (value === "" || value === undefined) {
      return null;
    }
    return value;
  })
  unread: boolean | undefined;
}

export class ParticipantSerializer {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  accountId: number;

  @Expose()
  @Type(() => BasicAccountSerializer)
  account: BasicAccountSerializer;

  @Expose()
  lastSeenId: number;

  @Expose()
  @Type(() => MessageSerializer)
  lastSeen: MessageSerializer;
}

export class ConversationSerializer extends BaseSerializer {
  @Expose()
  snapshot: string;

  @Expose()
  @Type(() => ParticipantSerializer)
  participants: ParticipantSerializer[];

  @Expose()
  @Type(() => MessageSerializer)
  messages: MessageSerializer[];

  @Expose()
  lastMessageId: number;

  @Expose()
  @Type(() => MessageSerializer)
  lastMessage: MessageSerializer;
}
