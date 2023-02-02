import ServiceOrderServ from "../../service/serviceOrder/ServiceOrderService";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import getErrorMessage from "../../helpers/GetErrorMessage";

class ServiceOrderController {

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const newServiceOrder = await ServiceOrderServ.store(data);

      if(!newServiceOrder) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid data' });
      else return res.status(StatusCodes.CREATED).json(newServiceOrder);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { authorization } = req.headers;
      console.log(req.headers);

      const allServiceOrders = await ServiceOrderServ.getAll(String(authorization));
      if(!allServiceOrders) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid authentication token' });
      else return res.status(StatusCodes.OK).json(allServiceOrders);

    } catch (error) {
      
      const message = getErrorMessage(error);
      console.log(message);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const serviceOrder = await ServiceOrderServ.getById(Number(id));

      if(!serviceOrder) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });
      else return res.status(StatusCodes.OK).json(serviceOrder);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async updateData(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const { id } = req.params;

      const updatedServiceOrder = await ServiceOrderServ.updateGeneralData(Number(id), data);

      if(!updatedServiceOrder) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });
      else return res.status(StatusCodes.OK).json(updatedServiceOrder);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedServiceOrder = await ServiceOrderServ.updateStatus(Number(id), status);

      if(!updatedServiceOrder) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });
      else return res.status(StatusCodes.OK).json(updatedServiceOrder);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async addCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { category } = req.body;

      const updatedServiceOrder = await ServiceOrderServ.addNewCategory(Number(id), category);

      if(!updatedServiceOrder) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });
      else return res.status(StatusCodes.OK).json(updatedServiceOrder);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async removeCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { category } = req.body;

      const updatedServiceOrder = await ServiceOrderServ.removeCategory(Number(id), category);

      if(!updatedServiceOrder) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });
      else return res.status(StatusCodes.OK).json(updatedServiceOrder);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };


  public async updateCostCenter(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { costCenter } = req.body;

      const updatedServiceOrder = await ServiceOrderServ.updateCostCenter(Number(id), costCenter);
      
      if(!updatedServiceOrder) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });
      else return res.status(StatusCodes.OK).json(updatedServiceOrder);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deleted = await ServiceOrderServ.delete(Number(id));
      if(!deleted) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Not found' });

      return res.status(StatusCodes.OK).json({ message: 'deleted' });

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json(message);
    };
  };
};

export default new ServiceOrderController();
