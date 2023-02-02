import { Response, Request } from 'express';
import { CommentService } from '../../service/serviceOrder/CommentService';
import { StatusCodes } from 'http-status-codes';
import getErrorMessage from '../../helpers/GetErrorMessage';

class CommentController extends CommentService {

  public async addNew(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const newComment = await super.store(data);

      if(!newComment) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid data' });
      return res.status(StatusCodes.CREATED).json(newComment);
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    }
  }


  public async fetchByOS(req: Request, res: Response): Promise<Response> {
    try {
      const { serviceOrderId } = req.query;
      console.log(serviceOrderId);
      const comments = await super.getByOSId(Number(serviceOrderId));

      if(!comments) res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid data' });
      return res.status(StatusCodes.CREATED).json(comments);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    }
  }


  public async updateData(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { comment } = req.body;

      const updatedComment = await super.update(Number(id), comment);

      if(!updatedComment) res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid data' });
      return res.status(StatusCodes.OK).json(updatedComment);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    }
  }


  public async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await super.delete(Number(id));

      if(!deleted) res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid data' });
      return res.status(StatusCodes.OK).json({ message: 'deleted' });

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    }
  }
}

export default new CommentController();
