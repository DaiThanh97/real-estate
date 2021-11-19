import { ICommentRepository, ITopicRepository } from "../domain/services/contract";
import { PagingSerializer } from "../interfaces/serializers/PagingSerializer";
import { Account } from "../domain/models/Account";

export default class TopicAppUseCases {
  public static async get(
    id: number,
    queryOptions: PagingSerializer,
    beans: {
      topicRepository: ITopicRepository,
      commentRepository: ICommentRepository,
    }
  ) {
    const topic = await beans.topicRepository.findOneOrFail({
      where: { id },
      relations: [
        "createdBy",
        "updatedBy",
      ],
    });

    const comments = await beans.commentRepository.find({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order: {
        createdAt: "DESC",
      },
      where: {
        topicId: id,
      },
      relations: [
        "createdBy",
        "updatedBy",
      ],
    });

    return {
      ...topic,
      comments,
    };
  }


  public static async createComment(
    id: number,
    content: string,
    account: Account,
    beans: {
      topicRepository: ITopicRepository,
      commentRepository: ICommentRepository,
    }
  ) {
    await beans.commentRepository.save({
      topicId: id,
      content,
      createdBy: account.id,
      updatedBy: account.id,
    });
  }
}
