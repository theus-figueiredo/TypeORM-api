import { Comment } from "../../database/entity/Comments";
import { repositories } from "../../database/repositories/Repositories";

const { commentRepository, serviceOrderRepository, userRepository } = repositories;

interface commentData {
  comment: string
  serviceOrderId: number
  userId: number
}

export class CommentService {

  public async store(data: commentData): Promise<Comment | null> {
    const user = await userRepository.findOneBy({ id: Number(data.userId) });
    const serviceOrder = await serviceOrderRepository.findOneBy({ id: Number(data.serviceOrderId) });

    if(!user || !serviceOrder) return null;

    const newComment = new Comment();

    newComment.comment = data.comment;
    newComment.user = user;
    newComment.serviceOrder = serviceOrder;

    await commentRepository.save(newComment);
    serviceOrder.comments?.push(newComment);
    return newComment
  };


  public async getById(id: number): Promise <Comment | null> {
    const comment = await commentRepository.findOne({ where: { id }, relations: ['user', 'serviceOrder']});
    if(!comment) return null;
    return comment;
  };


  public async getByOSId(osId: number): Promise<Comment[] | null> {
    const comments = await commentRepository.find({ where: { serviceOrder: { id: osId } }, relations: ['user']})
    if(!comments) return null;
    return comments;
  }


  public async update(id: number, newComment: string): Promise<Comment | null> {
    const comment = await commentRepository.findOneBy({ id });
    if(!comment) return null;

    comment.comment = newComment;
    await commentRepository.save(comment);
    return comment;
  };


  public async delete(id: number): Promise<boolean> {
    const comment = await commentRepository.findOneBy({ id });
    if(!comment) return false;

    await commentRepository.delete({ id });
    return true;
  }
};
