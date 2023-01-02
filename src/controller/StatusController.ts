import StatusService from "../service/StatusService";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import getErrorMessage from "../helpers/GetErrorMessage";


class StatusController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { status } = req.body;
      const newStatus = await StatusService.store(status);

      return res.status(StatusCodes.CREATED).json(newStatus);
    } catch (error) {
      const message = getErrorMessage(error);

      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const allStatus = await StatusService.readAll();
      return res.status(StatusCodes.OK).json(allStatus);
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const serviceStatus = await StatusService.readById(Number(id));

      if(!serviceStatus) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });

      return res.status(StatusCodes.OK).json(serviceStatus);
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };

  
  public async update(req: Request, res: Response): Promise<Response> {
    try {

      const { id } = req.params;
      const { status } = req.body;

      const updatedStatus = await StatusService.update(Number(id), status);

      if(!updatedStatus) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found'});

      return res.status(StatusCodes.OK).json(updatedStatus);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await StatusService.delete(Number(id));

      if(!deleted) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });

      return res.status(StatusCodes.OK).json({ message: 'deleted' });
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };
};

export default new StatusController();
