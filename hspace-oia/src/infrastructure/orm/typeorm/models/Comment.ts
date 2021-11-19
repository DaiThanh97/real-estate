import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { ITopic } from "./Topic";

export interface IComment {
  id: number;
  topicId: number;
  topic: ITopic;
  content: string;
}

export const Comment = new EntitySchema<IComment>({
  name: "comment",
  tableName: "comments",
  columns: {
    ...BaseColumnSchemaPart,
    topicId: {
      type: Number,
      name: "topic_id",
      nullable: false,
    },
    content: {
      type: String,
      name: "content",
      nullable: false
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    topic: {
      type: "many-to-one",
      target: "topic",
      joinColumn: { name: "topic_id", referencedColumnName: "id" },
    }
  }
});
