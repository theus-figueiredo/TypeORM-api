import CostCenterService from "../service/CostCenterService";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


class CostCenterController {


  private trhowNotFound(res: Response): Response {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Not Found'});
  };
  

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { name, monthlyBudget } = req.body;
      const newCostCenter = await CostCenterService.create(name, monthlyBudget);

      return res.status(StatusCodes.CREATED).json(newCostCenter);
    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    };
  };


  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const allCostCenters = await CostCenterService.readAll();
      return res.status(StatusCodes.OK).json(allCostCenters);
    } catch(error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    };
  };


  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const costCenter = await CostCenterService.readById(Number(id));

      if(!costCenter) return this.trhowNotFound(res);

      return res.status(StatusCodes.OK).json(costCenter);
    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    };
  };


  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const { id } = req.params;
  
      const updatedCostCenter = await CostCenterService.updateData(Number(id), data);
      if(!updatedCostCenter) return this.trhowNotFound(res);

      return res.status(StatusCodes.OK).json(updatedCostCenter);

    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    };
  };


  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const delted = await CostCenterService.delete(Number(id));
      if(!delted) return this.trhowNotFound(res);

      return res.status(StatusCodes.OK).json({ message: 'deleted' });
    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
};

export default new CostCenterController();
