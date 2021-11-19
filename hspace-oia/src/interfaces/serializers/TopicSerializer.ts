import { BaseSerializer } from "./Base";
import { Expose, Type } from "class-transformer";

export class CommentSerializer extends BaseSerializer {
  @Expose()
  content: string;

  @Expose()
  topicId: number;
}


export class TopicSerializer extends BaseSerializer {
  @Expose()
  @Type(() => Boolean)
  isActive: boolean;

  @Expose()
  @Type(() => CommentSerializer)
  comments: CommentSerializer[];
}
